const mongoose = require("mongoose")

const personalSchema = new mongoose.Schema({
    dateOfBirth: {
        type: String,
    },

    location: {
        type: String,
    },

    email: {
        type: String,
    },

    phone: {
        type: String,
    },

    languages: {
        type: String,
    },
});

const aboutSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        title: {
            type: String,
            default: "MERN Stack Developer"
        },

        introduction: {
            type: String,
        },

        journey: {
            type: String,
        },

        currentWork: {
            type: String,
        },

        profileImage: {
            type: String,
        },

        personal: [personalSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("About", aboutSchema);