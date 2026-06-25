const nodemailer = require("nodemailer")

const SendEmail = ({ to, subject, message }) => new Promise(async (resolve, reject) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        })

        await transporter.sendMail({ to, subject: subject, html: message }, (err) => {
            if (err) {
                console.log(err)
                reject("Unable To Send Email")
            }
            console.log("Email Send")
            resolve("Email Send")
        })

    } catch (error) {
        console.log(error)
        reject(error.message)
    }
})

module.exports = SendEmail