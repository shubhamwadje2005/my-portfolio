const asyncHandlear = require("express-async-handler")
const About = require("../modal/About.js")
const cloud = require("../utils/cloud.js")
const path = require("path")
const { uploadProfile } = require("../utils/uploader.js")

exports.createAbout = asyncHandlear(async (req, res) => {
    uploadProfile(req, res, async (err) => {

        if (err) {
            console.log(err)
            return res.status(500).json({ message: err.message })
        }

        const { name, title, introduction, journey, currentWork, personal } = req.body

        if (!name || !title || !introduction || !journey || !currentWork || !personal) {
            return res.status(400).json({ message: "all fields required" })
        }

        let imageUrl = ""

        if (req.file) {
            const { secure_url } = await cloud.uploader.upload(req.file.path)
            imageUrl = secure_url
        }

        let parsedPersonal = personal

        try {
            parsedPersonal = JSON.parse(personal)
        } catch { }

        await About.create({
            name,
            title,
            introduction,
            journey,
            currentWork,
            profileImage: imageUrl,
            personal: parsedPersonal
        })

        res.status(201).json({ message: "about create success" })

    })
})

// exports.createAbout = asyncHandlear(async (req, res) => {
//     const { name, title, introduction, journey, currentWork, profileImage, personal } = req.body
//     if (!name || !title || !introduction || !journey || !currentWork || !profileImage || !personal) {
//         return res.status(400).json({ message: "all fields required" })
//     }
//     await About.create({ name, title, introduction, journey, currentWork, profileImage, personal })
//     res.status(200).json({ message: "about added success" })
// })


exports.getAbout = asyncHandlear(async (req, res) => {
    const result = await About.findOne()
    res.status(200).json({ message: "about fetch success", result })
})

exports.updateAbout = asyncHandlear(async (req, res) => {

    uploadProfile(req, res, async (err) => {

        if (err) {
            console.log(err)
            return res.status(500).json({ message: err.message })
        }

        const { id } = req.params
        const { name, title, introduction, journey, currentWork, personal } = req.body

        const obj = {}

        if (name) obj.name = name
        if (title) obj.title = title
        if (introduction) obj.introduction = introduction
        if (journey) obj.journey = journey
        if (currentWork) obj.currentWork = currentWork

        // personal parse
        if (personal) {
            try {
                obj.personal = JSON.parse(personal)
            } catch {
                obj.personal = personal
            }
        }
        // image update
        if (req.file) {
            const { secure_url } = await cloud.uploader.upload(req.file.path)
            obj.profileImage = secure_url
        }

        await About.findByIdAndUpdate(id, obj, {
            new: true,
            runValidators: true
        })

        res.status(200).json({ message: "about update success" })

    })
})

// exports.updateAbout = asyncHandlear(async (req, res) => {
//     const { id } = req.params
//     const { name, title, introduction, journey, currentWork, profileImage, personal } = req.body
//     const obj = {}
//     console.log("params:", req.params)
//     console.log("body:", req.body)
//     if (name) obj.name = name
//     if (title) obj.title = title
//     if (introduction) obj.introduction = introduction
//     if (journey) obj.journey = journey
//     if (currentWork) obj.currentWork = currentWork
//     if (profileImage) obj.profileImage = profileImage
//     if (personal) {
//         const personalData = JSON.parse(personal)
//         obj.personal = [personalData]
//     }

//     await About.findByIdAndUpdate(id, obj, { runValidators: true })

//     res.status(200).json({ message: "about update success" })
// })

exports.deleteAbout = asyncHandlear(async (req, res) => {
    const { id } = req.params
    console.log("delete id data", id)

    const result = await About.findById(id)

    if (!result) {
        return res.status(404).json({ message: "About not found" })
    }

    let publicId = ""

    // ✅ handle string url
    if (typeof result.profileImage === "string") {
        publicId = path.basename(result.profileImage).split(".")[0]
    }

    // ✅ handle object (better way)
    if (typeof result.profileImage === "object") {
        publicId = result.profileImage.public_id
    }

    if (publicId) {
        await cloud.uploader.destroy(publicId)
    }

    await About.findByIdAndDelete(id)

    res.status(200).json({ message: "about delete success" })
})

// exports.deleteAbout = asyncHandlear(async (req, res) => {
//     const { id } = req.params
//     console.log("delete id data", id)

//     const result = await About.findByIdAndDelete(id)

//     if (!result) {
//         return res.status(404).json({ message: "About not found" })
//     }
//     res.status(200).json({ message: "about delete success" })
// })