const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateToken = async(data, time) => {
    return jwt.sign(data, process.env.JWT_SECRET, {expiresIn: time});
}

module.exports = generateToken;