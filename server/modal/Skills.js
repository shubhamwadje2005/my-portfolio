const mongoose = require("mongoose")

module.exports = mongoose.model("skill", new mongoose.Schema({
    skillName: {
        type: String,
        required: true,
        trim: true,
    },

    category: {
        type: String,
        default: "Other",
    },
    icon: {
        type: String,
        required: true,
    },

    level: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
    },

    order: {
        type: Number,
        default: 0,
    },
}, { timestamps: true }))