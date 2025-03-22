const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");

require("dotenv").config();

exports.createSection = async (req, res) => {

    try {
        //fetch section name and course id
        //note: course id is not given through UI but when course is created, created course is sent as response
        //and it could be sent so no issue we will figure it out

        const { sectionName, courseId } = req.body;

        //validate
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing properties",
            });
        }

        //create Section
        const newSection = await Section.create({ sectionName });
        //update the Course with section ID
        let updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id,
                }
            },
            { new: true }
        );
        
        if (updatedCourseDetails) {
            updatedCourseDetails = await updatedCourseDetails.populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                }
            });
        }

        //hw to populate to replace section and subsections both in updatedCourseDetails

        //return res
        return res.status(200).json({
            success: true,
            message: "Section created successfully.",
            updatedCourseDetails,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create section.",
            error: error.message,
        });
    }
}


exports.updateSection = async (req, res) => {
    try {
        //fetch details
        const { sectionName, sectionId, courseId } = req.body;

        //validate
        if (!sectionId || !sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing properties",
            });
        }

        //update data
        const section = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true });

        const course = await Course.findById({ _id: courseId })
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                }
            }).exec();
        

        //return res
        return res.status(200).json({
            success: true,
            message: section,
            data: course,
        });

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update section.",
            error: error.message,
        });
    }
};

exports.deleteSection = async (req, res) => {
    try {
        //fetch data
        const { sectionId } = req.body;  //just to learn a new of getting id, we could have sent it through body
        const { courseId } = req.body;
     
        //TODO: DO we need to dlete it from Course model as well
        await Course.findByIdAndUpdate(
            { _id: courseId },
            {
                $pull: {
                    courseContent: sectionId,
                }
            },
            {new: true},
        );

        const section = Section.findById({ _id: sectionId });

        if (!section) {
            return res.status(404).json({
                success: true,
                message: 'Section not found',
            })
        }

        //delete sub section
        await SubSection.deleteMany({ _id: { $in: section.subSection } });

        //delete section
        await Section.findByIdAndDelete({ _id: sectionId });

        //find the updated course and return
        const updatedCourse = await Course.findById({ _id: courseId })
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                }
            });


        //return res
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully.",
            data: updatedCourse,
        });


    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete section.",
            error: error.message,
        });
    }
};