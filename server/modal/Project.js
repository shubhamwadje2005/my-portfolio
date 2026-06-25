const mongoose = require("mongoose")

module.exports = mongoose.model("project", new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        default: "Web Apps",
    },

    imageUrl: {
        type: String,
    },

    technologies: [
        {
            type: String,
        },
    ],

    liveUrl: {
        type: String,
        default: "#",
    },

    githubUrl: {
        type: String,
        default: "#",
    },
}, { timestamps: true }))