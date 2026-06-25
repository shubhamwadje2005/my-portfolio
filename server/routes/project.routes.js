const project = require("../controller/project.controller.js")

const router = require("express").Router()


router
    .get("/fetch-project", project.getProject)
    .post("/add-project", project.createProject)
    .put("/edit-project/:pid", project.updateProject)
    .delete("/remove-project/:pid", project.deleteProject)

module.exports = router