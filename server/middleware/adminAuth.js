const jwt = require("jsonwebtoken")

exports.adminAuth = (req, res, next) => {
    // 1. Get token from cookies or Authorization header
    let token = req.cookies?.ADMIN
    
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({ message: "Access Denied: Invalid or Expired Token" })
    }
}
