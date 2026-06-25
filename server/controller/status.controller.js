const asyncHandlear = require("express-async-handler")
const Status = require("../modal/Status")


exports.createStatus = asyncHandlear(async (req, res) => {
    const { yearsExperience, projectsCompleted, technologies, happyClients } = req.body
    if (!yearsExperience || !projectsCompleted || !technologies || !happyClients) {
        return res.status(400).json({ message: "all fields required" })
    }
    await Status.create({ yearsExperience, projectsCompleted, technologies, happyClients })
    res.status(200).json({ message: "Status create success" })
})

exports.getStatus = asyncHandlear(async (req, res) => {
    const result = await Status.find()
    res.status(200).json({ message: "Status get success", result })
})

exports.updateStatus = asyncHandlear(async (req, res) => {
    const { sid } = req.params
    const { yearsExperience, projectsCompleted, technologies, happyClients } = req.body
    const obj = {}

    if (yearsExperience) obj.yearsExperience = yearsExperience
    if (projectsCompleted) obj.projectsCompleted = projectsCompleted
    if (technologies) obj.technologies = technologies
    if (happyClients) obj.happyClients = happyClients

    await Status.findByIdAndUpdate(sid, obj, { runValidators: true })
    res.status(200).json({ message: "Status update success" })
})



exports.deleteStatus = asyncHandlear(async (req, res) => {
    const { sid } = req.params
    const result = await Status.findByIdAndDelete(sid)
    if (!result) {
        return res.status(404).json({ message: "status data not found" })
    }
    res.status(200).json({ message: "Status delete success" })
})