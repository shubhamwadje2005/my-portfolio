const status = require("../controller/status.controller.js")

const router = require("express").Router()


router
    .get("/fetch-status", status.getStatus)
    .post("/add-status", status.createStatus)
    .put("/edit-status/:sid", status.updateStatus)
    .delete("/remove-status/:sid", status.deleteStatus)

module.exports = router