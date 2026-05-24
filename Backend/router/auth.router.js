const express = require("express");
const userModel = require("../model/user.model");
const routes = express.Router();
const { signup, login, getMe } = require("../controller/auth.controller")
const auth = require("../middleware/auth.middleware");
const roles = require("../middleware/roles.middleware");

routes.post("/sign_Up", signup);
routes.post("/log_in", login);
routes.get("/profile", auth, getMe);

module.exports = routes;