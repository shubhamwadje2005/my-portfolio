const skill = require("../controller/skills.controller.js")

const router = require("express").Router()


router
    .get("/fetch-skill", skill.getSkill)
    .post("/add-skill", skill.createSkill)
    .put("/edit-skill/:sid", skill.updateSkill)
    .delete("/remove-skill/:sid", skill.deleteSkill)

module.exports = router