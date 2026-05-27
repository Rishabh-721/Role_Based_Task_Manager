const express = require("express");
const userModel = require("../model/user.model");
const routes = express.Router();
const { signup, login, getMe, forgotPassword, verifyMailing, userVerification, changePassword } = require("../controller/auth.controller")
const auth = require("../middleware/auth.middleware");
const roles = require("../middleware/roles.middleware");

routes.post("/sign_Up", signup);
routes.post("/log_in", login);
routes.post("/forgotPassword", forgotPassword);
routes.post("/getverified", verifyMailing);
routes.get("/verify/:token", userVerification);
routes.post("/changePassword/:token", changePassword);
// Authenticated routes
routes.get("/profile", auth, getMe);


module.exports = routes;