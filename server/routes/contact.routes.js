const { CreateContactData } = require("../controller/contact.controller.js")

const router = require("express").Router()

router
    .post("/contact-data", CreateContactData)

module.exports = router