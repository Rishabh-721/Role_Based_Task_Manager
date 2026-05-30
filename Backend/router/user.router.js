const express = require("express");
const userModel = require("../model/user.model");
const taskModel = require("../model/task.model");
const routes = express.Router();
const auth = require("../middleware/auth.middleware");
const roles = require("../middleware/roles.middleware");
const {getAllUsers, userActivation, userDeactivation, userDeletion} 
= require("../controller/user.controller");


routes.get("/allUsers", auth, roles("super-admin","admin"), getAllUsers);
routes.patch("/activeUser/:id", auth, roles("super-admin"), userActivation);
routes.patch("/deleteUser/:id", auth, roles("super-admn"), userDeletion);

module.exports = routes;