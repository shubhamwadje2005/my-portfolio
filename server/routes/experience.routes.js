const experience = require("../controller/experience.controller.js")

const router = require("express").Router()


router
    .get("/fetch-exprience", experience.getExperience)
    .post("/add-exprience", experience.createExperience)
    .put("/edit-experience/:eid", experience.updateExperience)
    .delete("/remove-experience/:eid", experience.deleteExperience)

module.exports = router