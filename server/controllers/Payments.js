const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const { instance } = require("../config/razorpay");
const User = require("../models/User");
const mailSender  = require("../utils/mailSender");
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail');
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const crypto = require("crypto")

//initiate the razorpay order
exports.capturePayment = async (req, res) => {

    const { courses } = req.body;
    const userId = req.user.id;

    if (courses.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'No courses found'
        })
    }

    let totalAmount = 0;

    for (const course_id of courses) {

        let course;
        try {
            course = await Course.findById(course_id);

            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: 'Could not find the course'
                })
            }

            // const uid = new mongoose.Types.ObjectId(userId);


            //this means that user has already bought the course
            if (course.studentsEnrolled.includes(userId)) {
                return res.status(403).json({
                    success: false,
                    message: 'Student is already enrolled'
                })
            }

            totalAmount += parseInt(course.price);
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }            
    }

    console.log("YAHA TAK SAB SAHI HAI???");
    
    const options = {
        amount: totalAmount * 100,
        currency: 'INR',
        receipt: Math.random(Date.now()).toString(),
    }

    try {
        const paymentResponse = await instance.orders.create(options);
        return res.status(200).json({
            success: true,
            message: paymentResponse,
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Could not initiate order'
        })
    }
}

//verify the payment
exports.verifySignature = async (req, res) => {
    
    const { razorpay_order_id } = req.body;
    const { razorpay_payment_id } = req.body;
    const { razorpay_signature } = req.body;

    const { courses } = req.body;
    const userId = req.user.id;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        return res.status(404).json({
            success: false,
            message: "All fields are required."
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");
    
    if (expectedSignature === razorpay_signature) {
        //enroll karwao student ko
        await enrollStudents(courses, userId, res);
        //return res
        return res.status(200).json({ success: true, message: "Payment Verified" });
    }

    return res.status(500).json({ success: false, message: "Payment failed" });
}

const enrollStudents = async (courses, userId, res) => {
    
    if (!courses || !userId) {
        res.status(400).json({ success: false, message: "Please provide data for courses or userId" });
    }

    for (const courseId of courses) {
        try {
            //find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId }, 
                {
                    $push: { studentsEnrolled: userId },
                },
                {new: true},
            )

            if (!enrolledCourse) {
                return res.status(500).json({ success: false, message: "Course not found" });
            }

            const courseProgress = await CourseProgress.create({
                courseID: courseId,
                userId: userId,
                completedVideos: [],
            })

            //find the student and the course to the list of enrolled courses
            const enrolledStudent = await User.findByIdAndUpdate(userId,
                {
                    $push: {
                        courses: courseId,
                        courseProgress: courseProgress._id,
                    },
                },
                {new: true},
            )

            //bache ko mail send karo
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
            )

            console.log("Email Sent successfully", emailResponse.response);
        }
        catch (error) {
            console.log(error)
            return res.status(400).json({ success: false, error: error.message })
        }
    }
}

exports.sendPaymentSuccessEmail = async (req, res) => {
    try {
        
        const { orderId, paymentId, amount } = req.body;

        const userId = req.user.id;

        if (!orderId || !paymentId || !amount || !userId) {
            return res.status(404).json({success: false, message: "Please provide all the required fields"})
        }

        //student ko dhundo
        const enrolledStudent = User.findById(userId);
        console.log("YAHA TAK SAB SAHI??")

        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
            paymentSuccessEmail(`${enrollStudents.firstName}`, amount / 100, orderId, paymentId)
        )
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: "Could not send email" })
    }
}
    
// exports.capturePayment = async (req, res) => {
//     try {
//         //get course id and userID
//         const { course_id } = req.body;
//         const userID = req.user.id;

//         //validation
//         //validate couerse id
//         if (!course_id) {
//             return res.json({
//                 success: false,
//                 message: "Please provide valid course id.",
//             });
//         }

//         //validate courseDetail
//         let course;

//         try {
//             course = await Course.findById(course_id);
//             if (!course) {
//                 return res.json({
//                     success: false,
//                     message: "Could not find the course.",
//                 });
//             }

//             //user already paid for the course
//             const uid = new mongoose.Types.ObjectId(userID);
//             if (course.studentsEnrolled.includes(uid)) {
//                 return res.status(200).json({
//                     success: false,
//                     message: 'Student is already enrolled.',
//                 });
//             }


//         }
//         catch (error) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Fill the required fields.",
//             });
//         }

//         //order create
//         const amount = course.price;
//         const currency = "INR";

//         const options = {
//             amount: amount * 100,
//             currency,
//             receipt: Math.random(Date.now()).toString(),
//             notes: {
//                 courseId: course._id,
//                 userID,
//             }
//         };

//         try {
//             //initiate the payment using razorpay
//             const paymentResponse = await instance.orders.create(options);
//             console.log(paymentResponse);

//             //return res
//             return res.status(200).json({
//                 success: true,
//                 courseName: course.courseName,
//                 courseDescription: course.courseDescription,
//                 thumbnail: course.thumbnail,
//                 orderID: paymentResponse.id,
//                 currency: paymentResponse.currency,
//                 amount: paymentResponse.amount,
//             });
//         }
//         catch (error) {
//             console.log(error);
//             return res.json({
//                 success: false,
//                 message: "Could not intiate order.",
//             });
//         }
        
//     }
//     catch (error) {
//         console.log(error);
//         return res.json({
//             success: false,
//             message: "Could not intiate order.",
//         });
//     }
// };


// //verify payment by verifying signature of razorpay and server

// exports.verifySignature = async (req, res) => {
//     try {
//         const webhookSecret = "12345678";

//         const signature = req.headers["x-razorpay-signature"];

//         const shasum = crypto.createHmac("sha256", webhookSecret);
//         shasum.update(JSON.stringify(req.body));
//         const digest = shasum.digest("hex");

//         if (signature === digest) {
//             console.log("Payment is authorised.");

//             const { courseId, userId } = req.body.payload.payment.entity.notes;

//             try {
//                 //fullfil the action
//                 //find the course and enroll the student in it
//                 const enrolledCourse = await Course.findByIdAndUpdate(
//                     { _id: courseId },
//                     {
//                         $push: {
//                             studentsEnrolled: userId,
//                         }
//                     },
//                     { new: true },
//                 );

//                 if (!enrolledCourse) {
//                     return res.status(500).json({
//                         success: false,
//                         message: 'Course not found',
//                     })
//                 }
                             
//                 console.log(enrolledCourse);

//                 //find the student and add the course to their list of enrolled courses 
//                 const enrolledStudent = await User.findByIdAndDelete(
//                     { _id: userId },
//                     {
//                         $push: {
//                             courses: courseId,
//                         },
//                     },
//                     { new: true },
//                 );

//                 console.log(enrolledStudent);
                
//                 //mail send karo confirmation vala
//                 const emailResponse = await mailSender(enrolledCourse, "Congratulations from StuudyNotion,", "You bought a new course");

//                 console.log(emailResponse);

//                 return res.status(200).json({
//                     success: true,
//                     message: "Signature verified and course added.",
//                 });
//             }
//             catch (error) {
//                 console.log(error);
//                 return res.status(500).json({
//                     success: false,
//                     message: error.message,
//                 });
//             }
//         }
//         else {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid request.",
//             });
//         }
//     }
//     catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

