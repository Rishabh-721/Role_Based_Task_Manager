const express = require("express");
const userModel = require("../model/user.model");
const taskModel = require("../model/task.model");
const routes = express.Router();
const auth = require("../middleware/auth.middleware");
const roles = require("../middleware/roles.middleware");
const {getAllUsers } 
= require("../controller/user.controller");


routes.get("/allUsers", auth, roles("super-admin","admin"), getAllUsers);

module.exports = routes;