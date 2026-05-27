const express = require("express");
const userModel = require("../model/user.model");
const routes = express.Router();
const { signup, login, getMe, forgotPassword, verifyMailing, userVerification, changePassword, userLogout } 
= require("../controller/auth.controller")
const auth = require("../middleware/auth.middleware");
const roles = require("../middleware/roles.middleware");

routes.post("/signup", signup);
routes.post("/login", login);
routes.post("/forgotpassword", forgotPassword);
routes.post("/getverified", verifyMailing);
routes.get("/verify/:token", userVerification);
routes.post("/changepassword/:token", changePassword);
// Authenticated routes
routes.get("/profile", auth, getMe);
routes.get("/logout", auth, userLogout);

module.exports = routes;