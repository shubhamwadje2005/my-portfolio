const education = require("../controller/education.controller.js")

const router = require("express").Router()


router
    .get("/fetch-education", education.getEducation)
    .post("/add-education", education.createEducation)
    .put("/edit-education/:eid", education.updateEducation)
    .delete("/remove-education/:eid", education.deleteEducation)

module.exports = router