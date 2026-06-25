const asyncHandlear = require("express-async-handler")
const Education = require("../modal/Education")


exports.createEducation = asyncHandlear(async (req, res) => {
    const { degree, university, location, startYear, endYear } = req.body
    if (!degree || !university || !location || !startYear || !endYear) {
        return res.status(400).json({ message: "all fields required" })
    }
    await Education.create({ degree, university, location, startYear, endYear })
    res.status(200).json({ message: "Education create success" })
})

exports.getEducation = asyncHandlear(async (req, res) => {
    const result = await Education.find()
    res.status(200).json({ message: "Education get success", result })
})

exports.updateEducation = asyncHandlear(async (req, res) => {
    const { eid } = req.params
    const { degree, university, location, startYear, endYear } = req.body
    const obj = {}

    if (degree) obj.degree = degree
    if (university) obj.university = university
    if (location) obj.location = location
    if (startYear) obj.startYear = startYear
    if (endYear) obj.endYear = endYear

    await Education.findByIdAndUpdate(eid, obj, { runValidators: true })
    res.status(200).json({ message: "Education update success" })
})

exports.deleteEducation = asyncHandlear(async (req, res) => {
    const { eid } = req.params
    const result = await Education.findByIdAndDelete(eid)
    if (!result) {
        return res.status(404).json({ message: "Education data not found" })
    }
    res.status(200).json({ message: "Education delete success" })
})