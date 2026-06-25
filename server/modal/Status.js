const mongoose = require("mongoose")

module.exports = mongoose.model("status", new mongoose.Schema({
    yearsExperience: {
        type: String,
        required: true,
    },
    projectsCompleted: {
        type: String,
        required: true,
    },
    technologies: {
        type: String,
        required: true,
    },
    happyClients: {
        type: String,
        required: true,
    },
}, { timestamps: true }))