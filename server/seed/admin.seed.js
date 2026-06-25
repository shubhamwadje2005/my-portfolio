require("dotenv").config({ path: "./../.env" })
const mongoose = require("mongoose")
const Admin = require("../modal/Admin")
const bcrypt = require("bcryptjs")
exports.seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("db connected")
        const result = await Admin.findOne({ role: "admin" })
        if (result) {
            console.log("admin already present")
            process.exit(1)
        }
        const hash = await bcrypt.hash("admin@3428", 10)

        await Admin.create({
            name: "admin",
            email: "shubhamwadje2005@gmail.com",
            password: hash,
            mobile: "9028725948",
            role: "admin"
        })
        console.log("admin seed complete")
        process.exit(1)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
} 