const experience = require("../controller/experience.controller.js")
const { adminAuth } = require("../middleware/adminAuth")

const router = require("express").Router()


router
    .get("/fetch-exprience", experience.getExperience)
    .post("/add-exprience", adminAuth, experience.createExperience)
    .put("/edit-experience/:eid", adminAuth, experience.updateExperience)
    .delete("/remove-experience/:eid", adminAuth, experience.deleteExperience)

module.exports = router