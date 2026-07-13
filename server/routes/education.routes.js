const education = require("../controller/education.controller.js")
const { adminAuth } = require("../middleware/adminAuth")

const router = require("express").Router()


router
    .get("/fetch-education", education.getEducation)
    .post("/add-education", adminAuth, education.createEducation)
    .put("/edit-education/:eid", adminAuth, education.updateEducation)
    .delete("/remove-education/:eid", adminAuth, education.deleteEducation)

module.exports = router