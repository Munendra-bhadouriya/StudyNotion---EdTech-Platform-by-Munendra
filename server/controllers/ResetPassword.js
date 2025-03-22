const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");


/*The idea is to enable forgot password functionality,
    hence we are creating two controllers:

    First is used to take email of user and send them a mail with a frontend link, on clicking it 
    a page opens where user can enter new and confirm password

    Second is used to take this info and update the DB with new password for that user

    Key is we require unique URL for each user. So we create a token and attach it to link and send this unique link in mail
    But we also add this token and its expiry time(to not allow user to use same link again and again) to the User model
    so that when the token comes from the link(which user used to change password), we know ki kis user ki hai aur us user ka password
    update karna hai DB mein
*/

//reset password token
exports.resetPasswordToken = async (req, res) => {
    try {
        //get email from req body
        const { email } = req.body;
        //validate email and check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: "Your email is not registered with us.",
            });
        }

        //generate token
        //check karo we made changes in the User model added token and resetPasswordExpires

        /*In Node.js, the crypto module is a built-in module that provides cryptographic functionality,
        including hashing, encryption, and decryption.
        It allows developers to implement secure data handling by leveraging cryptographic algorithms.*/

        const token = crypto.randomUUID();
        
        //update user by adding token and expiration token
        const updatedDetails = await User.findOneAndUpdate(
            { email:email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000,
            }
        );
                                                
        //create url
        const url = `http://localhost:3000/update-password/${token}`;

        //send mail containing the url
        await mailSender(email, "Password Reset Link", url);

        //return response
        return res.json({
            success: true,
            message: "Email sent successfully, please check email and change password.",
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Cant reset password now,try again later.",
        });
    }
};

//reset password
exports.resetPassword = async (req, res) => {
    try {
        
        //fetch password, confirm password and token from the req body
        //note we placed token in the url but frontend will fetch and place it in req body for us
        const { password, confirmPassword, token } = req.body;

        //validation
        if (password !== confirmPassword) {
            return res.json({
                success: false,
                message: "Password not matching.",
            });
        }

        //get userDetails from Db using token
        const userDetails = await User.findOne({ token: token });

        //if no entry present - invalid token
        if (!userDetails) {
            return res.json({
                success: false,
                message: "Token is invalid.",
            });
        }

        //token time check
        if (userDetails.resetPasswordExpires < Date.now()) {  //=> that token expired, user cant use this link to generate new password
            return res.json({
                success: false,
                message: "Token is expired, please regenerate your token",
            });
        }

        //if here means theek hai bhai update kardo password
        //but hash it first
        const hashedPassword = await bcrypt.hash(password, 10);

        //now update it in Db
        const updatedUser = await User.findOneAndUpdate(
            { token: token },
            { password: hashedPassword },
            { new: true },
        );

        console.log("Updated password: ", updatedUser);

        //return response
        return res.status(200).json({
            success: true,
            message: "Password updated successfully.",
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Cant reset password now,try again later.",
        });
    }
};