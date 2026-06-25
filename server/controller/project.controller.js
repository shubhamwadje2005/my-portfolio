const asyncHandlear = require("express-async-handler")
const cloud = require("../utils/cloud")
const path = require("path")
const Project = require("../modal/Project")
const { uploadProject } = require("../utils/uploader")

exports.createProject = asyncHandlear(async (req, res) => {
    uploadProject(req, res, async (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: err.message })
        }

        const { title, description, category, technologies, liveUrl, githubUrl } = req.body
        if (!title || !description || !category || !technologies || !liveUrl || !githubUrl) {
            return res.status(400).json({ message: "all fields required" })
        }

        let images = ""

        if (req.file) {
            const { secure_url } = await cloud.uploader.upload(req.file.path)
            images = secure_url
        }

        await Project.create({
            title,
            description,
            category,
            imageUrl: images,
            technologies: technologies,
            liveUrl,
            githubUrl,
        })
        res.status(200).json({ message: "Project create success" })
    })
})


exports.getProject = asyncHandlear(async (req, res) => {
    const result = await Project.find().sort({ createdAt: -1 })
    res.status(200).json({ message: "Project get success", result })
})


exports.updateProject = asyncHandlear(async (req, res) => {
    uploadProject(req, res, async (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: err.message })
        }

        const { pid } = req.params
        const { title, description, category, technologies, liveUrl, githubUrl } = req.body

        const obj = {}

        if (title) obj.title = title
        if (description) obj.description = description
        if (category) obj.category = category
        // if (technologies) obj.technologies = technologies
        if (technologies) obj.technologies = technologies
        if (liveUrl) obj.liveUrl = liveUrl
        if (githubUrl) obj.githubUrl = githubUrl

        if (req.file) {
            const { secure_url } = await cloud.uploader.upload(req.file.path)
            obj.imageUrl = secure_url
        }

        await Project.findByIdAndUpdate(pid, obj, { runValidators: true })
        res.status(200).json({ message: "Project update success" })
    })
})


// exports.deleteProject = asyncHandlear(async (req, res) => {
//     const { pid } = req.params
//     const result = await Project.findById(pid)
//     await cloud.uploader.destroy(path.basename(result.imageUrl).split(".")[0])
//     await Project.findByIdAndDelete(pid)
//     if (!result) {
//         return res.status(404).json({ message: "project Not Found" })
//     }

//     // const result = await Project.findById(pid)

//     // if (!result) {
//     //     return res.status(404).json({ message: "project Not Found" })
//     // }

//     // if (result.imageUrl) {
//     //     await cloud.uploader.destroy(
//     //         path.basename(result.imageUrl).split(".")[0]
//     //     )
//     // }

//     // await Project.findByIdAndDelete(pid)
//     res.status(200).json({ message: "Project delete success" })
// })


exports.deleteProject = asyncHandlear(async (req, res) => {

    const { pid } = req.params

    const result = await Project.findById(pid)

    if (!result) {
        return res.status(404).json({
            message: "Project Not Found"
        })
    }

    if (result.imageUrl) {
        await cloud.uploader.destroy(
            path.basename(result.imageUrl).split(".")[0]
        )
    }

    await Project.findByIdAndDelete(pid)

    res.status(200).json({
        message: "Project delete success"
    })

})