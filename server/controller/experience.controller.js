const asyncHandlear = require("express-async-handler")
const Experience = require("../modal/Experience")


exports.createExperience = asyncHandlear(async (req, res) => {
    const { role, company, period, description, responsibilities, order } = req.body
    if (!role || !company || !period || !description || !responsibilities || !order) {
        return res.status(400).json({ message: "all fields required" })
    }
    await Experience.create({ role, company, period, description, responsibilities, order })
    res.status(200).json({ message: "Experience create success" })
})


exports.getExperience = asyncHandlear(async (req, res) => {
    const result = await Experience.find()
    res.status(200).json({ message: "Experience get success", result })
})


exports.updateExperience = asyncHandlear(async (req, res) => {
    const { eid } = req.params
    const { role, company, period, description, responsibilities, order } = req.body
    const obj = {}

    if (role) obj.role = role
    if (company) obj.company = company
    if (period) obj.period = period
    if (description) obj.description = description
    if (responsibilities) obj.responsibilities = responsibilities
    if (order !== undefined) obj.order = order

    await Experience.findByIdAndUpdate(eid, obj, { runValidators: true })
    res.status(200).json({ message: "Experience update success" })
})


exports.deleteExperience = asyncHandlear(async (req, res) => {
    const { eid } = req.params
    const result = await Experience.findByIdAndDelete(eid)

    if (!result) {
        return res.status(404).json({ message: "Experience data not found" })
    }
    res.status(200).json({ message: "Experience delete success" })
})