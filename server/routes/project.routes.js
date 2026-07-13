const project = require("../controller/project.controller.js")
const { adminAuth } = require("../middleware/adminAuth")

const router = require("express").Router()


router
    .get("/fetch-project", project.getProject)
    .post("/add-project", adminAuth, project.createProject)
    .put("/edit-project/:pid", adminAuth, project.updateProject)
    .delete("/remove-project/:pid", adminAuth, project.deleteProject)

module.exports = router