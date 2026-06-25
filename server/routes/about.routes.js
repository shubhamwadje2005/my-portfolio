const about = require("../controller/about.controller.js")

const router = require("express").Router()


router
    .get("/get-about", about.getAbout)
    .post("/create-about", about.createAbout)
    .put("/update-about/:id", about.updateAbout)
    .delete("/delete-about/:id", about.deleteAbout)

module.exports = router