const User = require("../models/User");
const Profile = require("../models/Profile");
const Course = require("../models/Course");
const { uploadToCloudinary } = require("../utils/imageUploader");
const {convertSecondsToDuration} = require("../utils/convertSecondsToDuration");
const CourseProgress = require("../models/CourseProgress");

exports.updateProfile = async (req, res) => {
    try {
      const {
        firstName = "",
        lastName = "",
        dateOfBirth = "",
        about = "",
        contactNumber = "",
        gender = "",
      } = req.body
      const id = req.user.id
  
      // Find the profile by id
      const userDetails = await User.findById(id)
      const profile = await Profile.findById(userDetails.additionalDetails)
  
      const user = await User.findByIdAndUpdate(id, {
        firstName,
        lastName,
      })
      await user.save()
  
      // Update the profile fields
      profile.dateOfBirth = dateOfBirth
      profile.about = about
      profile.contactNumber = contactNumber
      profile.gender = gender
  
      // Save the updated profile
      await profile.save()
  
      // Find the updated user details
      const updatedUserDetails = await User.findById(id)
        .populate("additionalDetails")
        .exec()
  
      return res.json({
        success: true,
        message: "Profile updated successfully",
        updatedUserDetails,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        error: error.message,
      })
    }
  }


exports.deleteAccount = async (req, res) => {
try {
    const id = req.user.id
    console.log(id)
    const user = await User.findById({ _id: id })
    if (!user) {
    return res.status(404).json({
        success: false,
        message: "User not found",
    })
    }
    // Delete Assosiated Profile with the User
    await Profile.findByIdAndDelete({
    _id: user.additionalDetails,
    })
    for (const courseId of user.courses) {
    await Course.findByIdAndUpdate(
        courseId,
        { $pull: { studentsEnroled: id } },
        { new: true }
    )
    }

    await CourseProgress.deleteMany({ userId: id })

    // Now Delete User
    await User.findByIdAndDelete({ _id: id })
    
    res.status(200).json({
    success: true,
    message: "User deleted successfully",
    })
    
} catch (error) {
    console.log(error)
    res
    .status(500)
    .json({ success: false, message: "User Cannot be deleted successfully" })
}
}

//get all profile details

exports.getAllUserDetails = async (req, res) => {
    try {
        //get id
        const id = req.user.id;

        //get user details
        const userDetails = await User.findById({ _id: id }).populate("additionalDetails").exec();

        //return res
        return res.status(200).json({
            success: true,
            message: "fetched profile details successfully.",
            userDetails,
        });

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch all user deatils.",
            error: error.message,
        });
    }
};

exports.updateDisplayPicture = async (req, res) => {
    try {
        const userId = req.user.id;
        const displayPicture = req.files.displayPicture;

        
        //upload to cloudinary
        const image = await uploadToCloudinary(displayPicture, process.env.FOLDER_NAME, 1000, 1000);
        console.log(image);

        //update the profile
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            {
                image: image.secure_url
            },
            { new: true },
        );

        res.status(200).json({
            success: true,
            message: `Image updated successfully.`,
            data: updatedProfile,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update the display picture.",
            error: error.message,
        });
    }
};

exports.getEnrolledCourses = async (req, res) => {
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

        var subSectionLength = 0;

        for (var i = 0; i < userDetails.courses.length; i++){
            subSectionLength = 0;
            let totalDurationInSeconds = 0;

            for (let j = 0; j < userDetails.courses[i].courseContent.length; j++){

                totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)

                userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds);
                subSectionLength += userDetails.courses[i].courseContent[j].subSection.length;
            }

            let courseProgressCount = await CourseProgress.findOne({
                courseID: userDetails.courses[i]._id,
                userId: userId,
            });

            courseProgressCount = courseProgressCount?.completedVideos.length

            if (subSectionLength === 0) {
                userDetails.courses[i].progressPercentage = 100;
            }
            else {
                /*To calculate progress upto 2 decimal points*/
                const multiplier = Math.pow(10, 2);
                userDetails.courses[i].progressPercentage = Math.round((courseProgressCount / subSectionLength) * 100 * multiplier) / multiplier;
            }
        }

        if (!userDetails) {
            return res.status(400).json({
              success: false,
              message: `Could not find user with id: ${userDetails}`,
            })
        }
        
        return res.status(200).json({
            success: true,
            data: userDetails.courses,
            message: "Successfully fetched enrolled courses.",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

