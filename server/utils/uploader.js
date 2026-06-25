const multer = require("multer")

const uploadProfile = multer({
    storage: multer.diskStorage({})
}).single("profileImage")

const uploadProject = multer({
    storage: multer.diskStorage({})
}).single("image")

module.exports = {
    uploadProfile,
    uploadProject
}