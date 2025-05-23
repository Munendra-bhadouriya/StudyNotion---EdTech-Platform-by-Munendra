const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");

exports.createRating = async (req, res) => {
    try {
        //fetch user id
        const userId = req.user.id;
        //fetch data from req body
        const { rating, review, courseId } = req.body;

        //check if user is enrolled or not
        const courseDetails = await Course.findOne(
            {
                _id: courseId,
                studentsEnrolled: { $elemMatch: { $eq: userId } },
            });
        
                                            
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in the course.",
            });
        }

        //check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({ user: userId, course: courseId });

        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: 'Course is already reviewed by the user.',
            }); 
        }

        //create rating ans review
        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            course: courseId,
            user: userId,
        });

        //update course with this rating and review
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            { _id: courseId },
            {
                $push: {
                    ratingAndReviews: ratingReview._id,
                },
            },
            { new: true },
        );

        console.log(updatedCourseDetails);

        //return response
        return res.status(200).json({
            success: true,
            message: "Rating and Review created sucessfully.",
            ratingReview,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};


exports.getAverageRating = async (req, res) => {
    try {
        //fetch course id jiski average rating chahiye
        const { courseId } = req.body;

        //calc avg rating
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId)
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                }
            }
        ]);

        //return rating
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            });
        }

        //if no rating or review exists
        return res.status(200).json({
            success: true,
            message: 'Average rating is 0, no ratings given till now.',
            averageRating: 0,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};


//getAll ratings and reviews
exports.getAllRating = async (req, res) => {
    try {
        const allReviews = await RatingAndReview.find({})
                                                .populate({
                                                    path: "user",
                                                    select: "firstName lastName email image",
                                                })
                                                .populate({
                                                    path: "course",
                                                    select: "courseName"
                                                })
                                                .exec();
                                                
        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully.",
            data: allReviews,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}