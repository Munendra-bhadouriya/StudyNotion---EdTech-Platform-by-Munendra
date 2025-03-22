const mongoose = require("mongoose");

// Define the Section schema
const section = new mongoose.Schema({
    sectionName: {
        type: String,
    },
    subSection: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "SubSection",
        },
    ],
});

// Export the Section model
module.exports = mongoose.model("Section", section);