const User = require("../models/User");
const otpGenerator = require("otp-generator");
const Otp = require("../models/Otp");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender")
const { passwordUpdated } = require("../mail/templates/passwordUpdate")
require("dotenv").config();


//generate and send otp controller  //used when you click first create account button after filling signup form
exports.sendOTP = async (req, res) => {
    
    try {
        //fetch email from req body
        const { email } = req.body;

        //check if user already exists
        const checkUserPresent = await User.findOne({ email });
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already registered",
            });
        }

        //generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        //check if otp is unique
        let result = await Otp.findOne({ otp: otp });

        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await Otp.findOne({ otp });
        }

        //create an entry in DB  //simply pre middleware will send email with the otp as well
        const otpBody = await Otp.create({ email, otp });
        console.log(otpBody);

        //return response successfull
        res.status(200).json({
            success: true,
            message: "Otp sent successfully.",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
 
//signup controller //used when you click verify and register button after entering the otp
exports.signUp = async (req, res) => {
    try {
        
        //data fetch from req ki body
        const { firstName, lastName, email, contactNumber, password, confirmPassword, accountType, otp } = req.body;

        //validate karlo
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }

        //dono password match karlo
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm doesnt match",
            });
        }

        //check if user already exists
        const checkUserPresent = await User.findOne({ email });
        if (checkUserPresent) {
            return res.status(400).json({
                success: false,
                message: "User already registered",
            });
        }

        //there can be chances user requested otp's multiple times so
        //find the most recent OTP stored for the User
        const recentOtp = await Otp.find({ email :email }).sort({ createdAt: -1 }).limit(1);

        //validate otp
        if (recentOtp.length === 0) {
            //otp not found
            return res.status(400).json({
                sucsess: false,
                message: "OTP not found",
            });
        }
        else if (otp !== recentOtp[0].otp) {
            //invalid otp
            return res.status(400).json({
                success: false,
                message: "Invalid Otp",
            })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //entry create in DB
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`,  //api generate a default profile pic using your initials
        });

        //return ans
        return res.status(200).json({
            success: true,
            message: "User is registered successfully.",
            user,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User cant be registered. Please try again later.",
        });
    }
}; 

//login controller
exports.login = async (req, res) => {
    try {
        //fetch data from req
        const { email, password, accountType } = req.body;

        //validation data
        if (!email || !password || !accountType) {
            return res.status(403).json({
                success: false,
                message: "All fields are required.",
            });
        }

        //check user exists or not
        const user = await User.findOne({ email }).populate("additionalDetails");
        //also check if accountType matches

        if (!user || user.accountType !== accountType) {
            return res.status(401).json({
                success: false,
                message: "User not registered please sign up first.",
            });
        }

        //password matching
        if (await bcrypt.compare(password, user.password)) {
            //password matches then generate JWT token
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                //expiresIn: "2h"
            });

            user.token = token;
            user.password = undefined;

            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully",
            });
        }
        else {
            return res.status(401).json({
                success: false,
                messsage: 'Password is incorrect',
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Login Failure, please try again',
        });
    }
};

//change passoword controller
exports.changePassword = async (req, res) => {
    try {
        //get user data whose password is changing
        const userDetails = await User.findById(req.user.id);

        // Get old password, new password, and confirm new password from req.body
        const { oldPassword, newPassword } = req.body;

        // Validate old password
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        )
        if (!isPasswordMatch) {
            // If old password does not match, return a 401 (Unauthorized) error
            return res
                .status(401)
                .json({ success: false, message: "The password is incorrect" })
        }

        // Update password
        const encryptedPassword = await bcrypt.hash(newPassword, 10)
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            { password: encryptedPassword },
            { new: true }
        );

        // Send notification email
        try {
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                "Password for your account has been updated",
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            )
            console.log("Email sent successfully:", emailResponse.response)
        } catch (error) {
            // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
            console.error("Error occurred while sending email:", error)
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
            })
        }
    
        // Return success response
        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });
    }
    catch (error) {
        // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while updating password:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating password",
            error: error.message,
        });
    }
};
