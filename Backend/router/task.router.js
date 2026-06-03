const express = require("express");
const taskModel = require("../model/task.model");
const routes = express.Router();
const auth = require("../middleware/auth.middleware");
const roles = require("../middleware/roles.middleware");
const { taskCreation, seeTasks, taskCreatedByMe, getOneTask, updateTask, taskStatusUp, taskReviewed, deleteTask,  } = require("../controller/task.controller");

routes.post("/taskCreation", auth ,roles("admin"), taskCreation);
routes.get("/getTasks", auth, seeTasks);
routes.get("/createdTasks", auth, roles("admin"), taskCreatedByMe);
routes.get("/task/:id", auth, getOneTask);
routes.put("/updatetask/:id", auth, roles("admin"), updateTask);
routes.patch("/statup/:id", auth, roles("employee"), taskStatusUp);
routes.patch("/reviewed/:id/:action", auth, roles("admin"), taskReviewed);
routes.delete("/delete/:id", auth, roles("admin"), deleteTask);

module.exports = routes;