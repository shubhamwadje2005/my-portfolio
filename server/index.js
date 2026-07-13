require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { FRONTEND_URL, ALLOWED_ORIGINS } = require("./utils/config")

const app = express()
mongoose.connect(process.env.MONGO_URL)
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (ALLOWED_ORIGINS.indexOf(origin) !== -1 || origin.startsWith("http://localhost:")) {
            return callback(null, true);
        }
        if (process.env.NODE_ENV !== "production") {
            return callback(null, true);
        }
        return callback(new Error('CORS policy check failed'), false);
    },
    credentials: true
}))

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

// const cors = require("cors");

// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://my-portfolio-one-peach-72.vercel.app",
// ];

// app.use(
//   cors({
//     origin(origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );