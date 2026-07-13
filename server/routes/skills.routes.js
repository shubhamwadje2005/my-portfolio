const skill = require("../controller/skills.controller.js")
const { adminAuth } = require("../middleware/adminAuth")

const router = require("express").Router()


router
    .get("/fetch-skill", skill.getSkill)
    .post("/add-skill", adminAuth, skill.createSkill)
    .put("/edit-skill/:sid", adminAuth, skill.updateSkill)
    .delete("/remove-skill/:sid", adminAuth, skill.deleteSkill)

module.exports = router