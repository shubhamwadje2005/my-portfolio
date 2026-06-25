const rateLimiter = require("express-rate-limit")

exports.createRateLimiter = ({ timing = 1000 * 60, max = 2 }) => rateLimiter({
    windowMs: timing,
    max
})