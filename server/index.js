require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const { FRONTEND_URL } = require("./utils/config")

const app = express()
mongoose.connect(process.env.MONGO_URL)
app.use(express.json())
app.use(cors({ origin: FRONTEND_URL, credentials: true }))

app.use("/api/user", require("./routes/contact.routes.js"))
app.use("/api/admin", require("./routes/adminroutes.js"))
app.use("/api/about", require("./routes/about.routes.js"))
app.use("/api/education", require("./routes/education.routes.js"))
app.use("/api/experience", require("./routes/experience.routes.js"))
app.use("/api/project", require("./routes/project.routes.js"))
app.use("/api/skill", require("./routes/skills.routes.js"))
app.use("/api/status", require("./routes/status.routes.js"))

mongoose.connection.once("open", () => {
    console.log("mongo connected")
    app.listen(process.env.PORT, () => {
        console.log(`server running on port ${process.env.PORT}`)
        console.log(`cors allowed ${FRONTEND_URL}`)
        console.log(`node env ${process.env.NODE_ENV}`)
    })
})