const about = require("../controller/about.controller.js")
const { adminAuth } = require("../middleware/adminAuth")

const router = require("express").Router()


router
    .get("/get-about", about.getAbout)
    .post("/create-about", adminAuth, about.createAbout)
    .put("/update-about/:id", adminAuth, about.updateAbout)
    .delete("/delete-about/:id", adminAuth, about.deleteAbout)

module.exports = router