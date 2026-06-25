const asyncHandler = require("express-async-handler")
const Admin = require("../modal/Admin")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { PRODUCTION } = require("../utils/config")

exports.singin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Email And Password Are Required" })
    }

    if (!email) {
        return res.status(400).json({ message: "Invalid Email" })
    }

    const result = await Admin.findOne({ email })
    if (!result) {
        return res.status(401).json({
            message: process.env.NODE_ENV === PRODUCTION
                ? "Invalid Credentials"
                : "Email Not Found"
        })
    }

    if (!result.active) {
        return res.status(401).json({ message: "Account Blocked By Admin" })
    }

    const verify = await bcryptjs.compare(password, result.password)
    if (!verify) {
        return res.status(401).json({
            message: process.env.NODE_ENV === PRODUCTION
                ? "Invalid Credentials"
                : "Invalid Password"
        })
    }

    const token = jwt.sign({ _id: result._id }, process.env.JWT_KEY, { expiresIn: "1d" })
    res.cookie("ADMIN", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, secure: process.env.NODE_ENV === PRODUCTION })

    res.status(200).json({
        message: "admin login success", result: {
            name: result.name,
            email: result.email,
            mobile: result.mobile,
            _id: result._id,
            role: result.role,

        }
    })
})


exports.logout = asyncHandler(async (req, res) => {
    res.clearCookie("ADMIN")
    res.status(200).json({ message: 'Admin Logout Success' })
})