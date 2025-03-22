const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 60*5, // The document will be automatically deleted after 5 minutes of its creation time
    },
});

async function sendVerificationEmail(email, otp) {
    // Create a transporter to send emails

	// Define the email options

	// Send the email
    try {
        const mailResponse = await mailSender(email, "Verification Email", emailTemplate(otp));
        console.log("Email sent successfully.", mailResponse.response);
    }   
    catch (error) {
        console.log("Error occurred while sending mail", error);
        throw error;
    }
}

// Define a pre-save hook to send email after the document has been saved
otpSchema.pre("save", async function (next) {

    await sendVerificationEmail(this.email, this.otp);
    next();
})

module.exports = mongoose.model("Otp", otpSchema);