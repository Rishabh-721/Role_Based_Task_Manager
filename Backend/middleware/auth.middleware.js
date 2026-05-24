const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const auth = async(req, res, next) => {
    try {
    const authHeader  = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            success: false,
            message: "Unauthorized access",
        })
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.userID).select("-password");

    if(!user){
        return res.status(401).json({
            sucess: false,
            message: "User not found"
        })
    }

    req.user = user;

    next();

    } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
}
}

module.exports = auth;