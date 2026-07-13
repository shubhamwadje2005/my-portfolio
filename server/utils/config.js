const PRODUCTION = "production"
const FRONTEND_URL = process.env.NODE_ENV === PRODUCTION
    ? process.env.LIVE_URL
    : process.env.LOCAL_URL

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : [process.env.LIVE_URL, process.env.LOCAL_URL];

module.exports = { PRODUCTION, FRONTEND_URL, ALLOWED_ORIGINS }