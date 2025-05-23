const jwt = require("jsonwebtoken");
require("dotenv").config();

//auth
exports.auth = async (req, res, next) => {
    try {
        //extract token
        const token = req.body.token || req.cookies.token || req.header("Authorisation").replace("Bearer ", "");
        //if token missing
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing.",
            });
        }

        //verify token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch (err) {
            //verification issue
            return res.status(401).json({
                success: false,
                message: 'Token is invalid',
            });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Something went wrong while validating the token.',
        });
    }
};

//isStudent
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).josn({
                success: false,
                message: "This is a protected route for students only.",
            });
        }
        next();
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User role cant be verified, please try again',
        });
    }
};

//isInstructor
exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(401).josn({
                success: false,
                message: "This is a protected route for instructors only.",
            });
        }
        next();
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User role cant be verified, please try again',
        });
    }
};

//isAdmin
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).josn({
                success: false,
                message: "This is a protected route for Admins only.",
            });
        }
        next();
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User role cant be verified, please try again',
        });
    }
};
