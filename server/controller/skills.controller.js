const asyncHandlear = require("express-async-handler")
const Skills = require("../modal/Skills")

exports.createSkill = asyncHandlear(async (req, res) => {
    const { skillName, category, level, order, icon } = req.body
    if (!skillName || !category || level === undefined || order === undefined || !icon) {
        return res.status(400).json({ message: "all fields required" })
    }
    await Skills.create({ skillName, category, level, order, icon })
    res.status(200).json({ message: "Skill create success" })
})

exports.getSkill = asyncHandlear(async (req, res) => {
    const result = await Skills.find().sort({ order: 1 })
    res.status(200).json({ message: "Skill get success", result })
})

exports.updateSkill = asyncHandlear(async (req, res) => {
    const { sid } = req.params
    const { skillName, category, level, order, icon } = req.body
    const obj = {}

    if (skillName) obj.skillName = skillName
    if (category) obj.category = category
    if (level !== undefined) obj.level = level
    if (order !== undefined) obj.order = order
    if (icon) obj.icon = icon

    await Skills.findByIdAndUpdate(sid, obj, { runValidators: true })
    res.status(200).json({ message: "Skill update success" })
})

exports.deleteSkill = asyncHandlear(async (req, res) => {
    const { sid } = req.params
    const result = await Skills.findByIdAndDelete(sid)
    if (!result) {
        return res.status(404).json({ message: "skill data not found" })
    }
    res.status(200).json({ message: "Skill delete success" })
})