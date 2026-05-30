const express = require("express");
const userModel = require("../model/user.model");
const taskModel = require("../model/task.model");
const routes = express.Router();
const auth = require("../middleware/auth.middleware");
const roles = require("../middleware/roles.middleware");
const {getAllUsers, userActivation, userDeactivation, userDeletion, userDeleted, restoreUser, promote, demote, singleUser, updateSelf, changeMail} 
= require("../controller/user.controller");


routes.get("/allUsers", auth, roles("super-admin","admin"), getAllUsers);
routes.patch("/activeUser/:id", auth, roles("super-admin"), userActivation);
routes.patch("/deactiveUser/:id", auth, roles("super-admin"), userDeactivation);
routes.get("/deletedUser", auth, roles("super-admin"), userDeleted);
routes.patch("/deleteUser/:id", auth, roles("super-admin"), userDeletion);
routes.patch("/restoreUser/:id", auth, roles("super-admin"), restoreUser);
routes.patch("/promote/:id", auth, roles("super-admin"), promote);
routes.patch("/demote/:id", auth, roles("super-admin"), demote);
routes.get("/single/:id", auth, roles("super-admin", "admin"), singleUser);
routes.put("/infoUpdate", auth, updateSelf);
routes.patch("/changeEmail/:id", auth, roles("super-admin"), changeMail);

module.exports = routes;