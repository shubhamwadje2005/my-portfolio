const mongoose = require("mongoose");

module.exports = mongoose.model("experience", new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },

    company: {
        type: String,
        required: true,
    },

    period: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    responsibilities: [
        {
            type: String,
        },
    ],

    order: {
        type: Number,
        default: 0,
    },
}, { timestamps: true }))