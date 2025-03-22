const { uploadToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();
const SubSection = require("../models/SubSection");
const Section = require("../models/Section");

exports.createSubSection = async (req, res) => {
    try {
        //fetch details
        const { sectionId, title, description} = req.body;
        //extract video file
        const video = req.files.video;
        console.log("SectionID", video);
        //validate
        if (!sectionId || !title || !description || !video) {
            return res.status(404).json({
                success: false,
                message: "All properties required.",
            });
        }

        //upload to cloudinary
        const uploadDetails = await uploadToCloudinary(video, process.env.FOLDER_NAME);
        //create a subsection
        const subsectionDetails = await SubSection.create({
            title: title,
            timeDuration: `${uploadDetails.duration}`,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });

        //update this subsection id in Section
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $push: {
                    subSection: subsectionDetails._id,
                }
            },
            { new: true },
        ).populate("subSection");

        console.log("updatedSection..........", updatedSection);

        //log updated section here after, adding populate query
        //return response
        return res.status(200).json({
            success: true,
            message: "SubSection created successfully.",
            updatedSection,
        });
            
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create subsection.",
            error: error.message,
        });
    }
};


//hw: updated subsection
exports.updateSubSection = async (req, res) => {
    try {
        const { sectionId, subSectionId, title, description } = req.body

        const subSection = await SubSection.findById(subSectionId)
  
        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            })
        }
  
        if (title !== undefined) {
            subSection.title = title
        }
  
        if (description !== undefined) {
            subSection.description = description
        }
        if (req.files && req.files.video !== undefined) {
            const video = req.files.video
            const uploadDetails = await uploadToCloudinary(
                video,
                process.env.FOLDER_NAME
            )
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
        }
  
        await subSection.save()
  
        // find updated section and return it
        const updatedSection = await Section.findById(sectionId).populate(
            "subSection"
        )
  
        console.log("updated section", updatedSection);
  
        return res.json({
            success: true,
            message: "Section updated successfully",
            data: updatedSection,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the section",
        })
    }
};


//hw: delete subsection
exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body;
        await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $pull: {
                    subSection: subSectionId,
                },
            }
        )
        const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
        if (!subSection) {
            return res
                .status(404)
                .json({ success: false, message: "SubSection not found" })
        }
  
        // find updated section and return it
        const updatedSection = await Section.findById(sectionId).populate(
            "subSection"
        )
  
        return res.json({
            success: true,
            message: "SubSection deleted successfully",
            data: updatedSection,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the SubSection",
        })
    }
};
