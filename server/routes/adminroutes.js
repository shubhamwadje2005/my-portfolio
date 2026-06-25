const { logout, singin } = require("../controller/admin.controller.js")
const { createRateLimiter } = require("../middleware/limiter")

const router = require("express").Router()

router
    .post("/login", createRateLimiter({ max: 3 }), singin)
    .post("/logout", logout)

module.exports = router