require("dotenv").config();

const APP_PORT = process.env.APP_PORT || "3001"
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || ""
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || ""

module.exports = {
    APP_PORT,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET
}