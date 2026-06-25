const asyncHandler = require("express-async-handler")
const Contacts = require("../modal/Contacts")
const SendEmail = require("../utils/email")
const { contactTemplate } = require("../email-templtes/contactTemplate")

exports.CreateContactData = asyncHandler(async (req, res) => {
    const { name, email, message, subject } = req.body
    const result = await Contacts.create({ name, email, message, subject })
    await SendEmail({
        to: process.env.EMAIL,
        from: result.email,
        message: contactTemplate({ name, email, message, subject }),
        // subject: `New Portfolio Message from ${name}`
        subject: `Portfolio Inquiry: ${subject} | ${name}`
    })
    res.json({ message: "Contact Data Add Successfully", result })
})