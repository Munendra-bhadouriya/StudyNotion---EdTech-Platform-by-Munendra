const Course = require("../models/Course");
const User = require("../models/User");
const { uploadToCloudinary } = require("../utils/imageUploader");
const Category = require("../models/Category");
const CourseProgress = require('../models/CourseProgress');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const { convertSecondsToDuration } = require("../utils/convertSecondsToDuration");

//handler function to create course
//note only instructor is shown the option of creating course(so if user has that url endpoint that mean middleware
// is applied and auth and isInstructor is passed)


exports.createCourse = async (req, res) => {
    try {
        
        //fetch data
        const { courseName, courseDescription, whatYouWillLearn, price, tag: _tag, category, status, instructions: _instructions } = req.body;

        //note instructions: _instructions => 
        /*instructions → This is the original property name in someObject.
        _instructions → This is the new variable name that stores the value of instructions

        Extracts instructions from req.body and assigns it to _instructions
        */

        //fetch thumbnail
        const thumbnail = req.files.thumbnailImage;

        // Convert the tag and instructions from stringified Array to Array
        //This code is used to convert a JSON string into a JavaScript object or array.
        /*  {
            "tag": "[\"Programming\", \"JavaScript\"]",
            "instructions": "[\"Step 1\", \"Step 2\", \"Step 3\"]"
            }

            const { tag: _tag, instructions: _instructions } = req.body;
            console.log(_tag);  // "[\"Programming\", \"JavaScript\"]"
            console.log(_instructions);  // "[\"Step 1\", \"Step 2\", \"Step 3\"]"


            const tag = JSON.parse(_tag);
            const instructions = JSON.parse(_instructions);

            console.log(tag);  // ["Programming", "JavaScript"] (Now an array)
            console.log(instructions);  // ["Step 1", "Step 2", "Step 3"] (Now an array)

         */
        const tag = JSON.parse(_tag);
        const instructions = JSON.parse(_instructions);

        // console.log("tag", tag)
        // console.log("instructions", instructions)

        //validate data
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag.length || !thumbnail || !category || !instructions.length) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        //check for instructor i.e. fetch instructor details as course model requires instructor id to be stored
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Istructor Details : ", instructorDetails);
        //TODO : verify that userId and instructorDetails._id are same or diffferent

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor details not found.",
            });
        }
        
        //check given category is valid or not
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category details not found.",
            });
        }

        //Upload image to cloudinary
        const thumbnailImage = await uploadToCloudinary(thumbnail, process.env.FOLDER_NAME);

        //create entry of new course in Db
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag,
            thumbnail: thumbnailImage.secure_url,
            status: status,
            instructions,
            category: categoryDetails._id,
        });

        //add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            { new: true },
        );

        //update the Categories ka schema HW
        const categoryDetails2 = await Category.findByIdAndUpdate(
            { _id: category },
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            { new: true }
        )
        
        console.log("HEREEEEEEEE", categoryDetails2);

        //return res
        return res.status(200).json({
            success: true,
            message: "Course created successfully.",
            data: newCourse,
        });

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create course.",
            error: error.message,
        });
    }
};

exports.editCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const updates = req.body;
        const course = await Course.findById({ _id: courseId });

        if (!course) {
            return res.status(404).json({
                success: false,
                error: "Course Not found"
            });
        }

        //If thumbnail image is found, update it
        if (req.files) {
            console.log("thumbnail updates");
            const thumbnail = req.files.thumbnailImage 
            const thumbnailImage = await uploadToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )

            course.thumbnail = thumbnailImage.secure_url;
        }

        // Update only the fields that are present in the request body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === "tag" || key === "instructions") {
                    course[key] = JSON.parse(updates[key])
                }
                else {
                    course[key] = updates[key]
                }
            }
        }

        await course.save()

        const updatedCourse = await Course.findOne({
        _id: courseId,
        })
        .populate({
            path: "instructor",
            populate: {
            path: "additionalDetails",
            },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate: {
            path: "subSection",
            },
        })
        .exec();
        
        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        })
      
    }   
    catch (error) {
        console.error(error)
        res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
        })
    }
}


//get all courses handler function
exports.showAllCourses = async (req, res) => {
    try {
        //TODO improve this statement incrementally
        const allCourses = await Course.find({});

        //return res
        return res.status(200).json({
            success: true,
            message: "data for all courses fetched successfully.",
            data: allCourses,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "cannot fetch course data.",
            error: error.message,
        });
    }
}

//handler getting entire course detail with all values populated
exports.getCourseDetail = async (req, res) => {
    try {
        //fetch course id
        const { courseId } = req.body;

        //find course details
        const courseDetails = await Course.findById({ _id: courseId })
            .populate(
                {
                    path: "instructor",
                    populate: {
                        path: "additionalDetails",
                    },
                }
            )
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();
                                                    
        //validation
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `could not find the course with ${courseId}`,
            });
        }

        let totalDurationInSeconds = 0;
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                totalDurationInSeconds += parseInt(subSection.timeDuration);
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        //return response
        return res.status(200).json({
            success: true,
            message: "Course fetched successfully",
            data: {
                courseDetails,
                totalDuration
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "cannot fetch course data.",
            error: error.message,
        });
    }
};

exports.getFullCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        const courseDetails = await Course.findById(courseId)
            .populate({
                path: 'instructor',
                populate: {
                    path: 'additionalDetails',
                }
            })
            .populate('category')
            .populate('ratingAndReviews')
            .populate({
                path: 'courseContent',
                populate: {
                    path: 'subSection',
                }
            }).exec();
        
        let courseProgressCount = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
        });

        if (!courseDetails) {
            return res.status(400).json({
              success: false,
              message: `Could not find course with id: ${courseId}`,
            })
        }

        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        return res.status(200).json({
            success: true,
            data: {
              courseDetails,
              totalDuration,
              completedVideos: courseProgressCount?.completedVideos
                ? courseProgressCount?.completedVideos
                : [],
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {

    try {
        const userId = req.user.id;
        
        let userDetails = await User.findOne({_id: userId})
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                    }
                }
            }).exec();
        
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            })
        }
        
        
        userDetails = userDetails.toObject();

        for (var i = 0; i < userDetails.courses.length; i++){
            let totalDurationInSeconds = 0;

            for (let j = 0; j < userDetails.courses[i].courseContent.length; j++){

                totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)

                userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds);
            }
        }
        
        return res.status(200).json({
            success: true,
            data: userDetails.courses,
            message: "Successfully fetched enrolled courses.",
        });
        
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "cannot fetch instructor courses data.",
            error: error.message,
        });
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body;

        //Find the course
        const course = await Course.findById({ _id: courseId });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            })
        }

        //unenroll student from the course
        const studentsEnrolled = course.studentsEnrolled;

        for (const studentId of studentsEnrolled) {
            await User.findById({ _id: studentId }, {
                $pull: {courses: courseId},
            })
        }

        //Delete the sections and sub-sections
        const courseSections = course.courseContent;

        for (const sectionId of courseSections) {
            
            //Delete subsections of sections
            const section = await Section.findById(sectionId);
            if (section) {
                const subSections = section.subSection;

                for (const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }

            //Delete the section
            await Section.findByIdAndDelete(sectionId);            
        }

        //Delete the course
        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success: true,
            message: 'Course deleted successfully'
        });
        
    }
    catch (error) {
        console.error(error)
        return res.status(500).json({
        success: false,
        message: "Failed to delete the course",
        error: error.message,
        })
    }
}


exports.getCourseName = async (req, res) => {
    try {
        const { courseId } = req.query;  // Reads courseId from query params

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing courseId parameter",
            });
        }

        const course = await Course.findById(courseId);  // Fixed findById usage
        
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Invalid Course ID",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Returned course name",
            courseName: course.courseName,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to find course name",
            error: error.message,
        });
    }
};
