const mongoose = require("mongoose")


module.exports = mongoose.model("education", new mongoose.Schema({
    degree: {
        type: String,
        required: true
    },
    university: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    startYear: {
        type: Number
    },
    endYear: {
        type: Number
    }
}, { timestamps: true }))