const status = require("../controller/status.controller.js")
const { adminAuth } = require("../middleware/adminAuth")

const router = require("express").Router()


router
    .get("/fetch-status", status.getStatus)
    .post("/add-status", adminAuth, status.createStatus)
    .put("/edit-status/:sid", adminAuth, status.updateStatus)
    .delete("/remove-status/:sid", adminAuth, status.deleteStatus)

module.exports = router