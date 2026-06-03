const taskModel = require("../model/task.model");


const taskCreation = async(req, res) => {
try {
    const user = req.user;

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const {title, description, dueDate, resources, assignedTo} = req.body;

    if(!title || !description){
        return res.status(400).json({
        message: "Title and description are required"
    });
    }

    if(!Array.isArray(resources)){
        return res.status(400).json({
        message: "Resources must be an array"
    });
    }

    const task = await taskModel.create({
        title, description, createdBy: user._id, dueDate, resources, assignedTo
    });

    return res.status(201).json({
        message: "Task created successfully",
        data: task
    });

} catch (error) {
    res.status(500).json({
        message: `Server Error: ${error}`
    })
}}

const seeTasks = async(req, res) => {
try {
   const user = req.user;
   
   if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

   const {status} = req.query;

   let tasks;

    if(!status){
        if(user.role === "super-admin"){
         tasks = await taskModel.find({});
        }else if(user.role === "admin" || user.role === "employee"){
         tasks = await taskModel.find({$or: [{assignedTo: user._id},{createdBy: user._id}]})};
    }else{
        if(user.role === "super-admin"){
         tasks = await taskModel.find({status});
        }else if(user.role === "admin" || user.role === "employee"){
         tasks = await taskModel.find({$or: [{assignedTo: user._id},{createdBy: user._id}],status: status});
        }
    }

    let message;

    if(!status && tasks.length === 0){
        message = "No tasks found"
    }else if(status && tasks.length === 0){
        message = `No ${status} tasks found`
    }else if(status && tasks.length > 0){
        message = `${status} tasks found successfully`
    }else{
        message = `All Tasks found successfullyy`
    }

    res.status(200).json({
        message,
        count: tasks.length,
        data: tasks,
    })

} catch (error) {
    res.status(500).json({
    message: `Server Error: ${error}`
    })
}}

const taskCreatedByMe = async(req, res) => {
try {
    const user = req.user;
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    const tasks = await taskModel.find({createdBy: user._id});
    if(!tasks){
        return res.status(401).json({
            message: "Task not found"
        })
    }
    res.status(200).json({
        message: `Task found sucessfully`,
        count: tasks.length,
        data: tasks,
    })
} catch (error) {
    res.status(500).json({
    message: `Server Error: ${error}`
    })
}}

const getOneTask = async(req, res) => {
try {
    const id = req.params.id;
    
    if(!id){
        return res.status(401).json({
            message: `task id not found`
        })
    }
    
    const task = await taskModel.findById(id);

    if(!task){
        return res.status(400).json({
            message: `tasks were found`
        })
    }

    res.status(200).json({
        message: `Task Found Sucessfully`,
        data: task,
    })

} catch (error) {
    res.status(500).json({
    message: `Server Error: ${error}`
    })
}}

const updateTask = async(req, res) => {
try {
    const user = req.user;

    const id = req.params.id;
    
    if(!id){
        return res.status(401).json({
            message: `task id not found`
        })
    }

    const task = await taskModel.findById(id);

    if(!task){
        return res.status(400).json({
            message: `tasks were found`
        })
    }

    const {title, description, dueDate, status, resources, assignedTo} = req.body;

    if(task.createdBy.toString() !== user._id.toString()){
        return res.status(403).json({
            message: "You are not allowed to modify this task"
        })
    }

    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.status = status;
    task.resources = resources;
    task.assignedTo = assignedTo;
    task.updatedAt = Date.now();
    await task.save();

    res.status(200).json({
        message: `task has been updated by ${user.name}`,
        data : task,
    })
    
} catch (error) {
    res.status(500).json({
    message: `Server Error: ${error}`
    })
}}

const taskStatusUp = async(req, res)=> {
try {
    const user = req.user;
    const id = req.params.id;

    if(!id){
        return res.status(401).json({
            message: `task id not found`
        });
    }

    const task = await taskModel.findById(id);

    if(!task){
        return res.status(403).json({
            message: "You are not allowed to modify this task"
        })
    }

    
    if(task.assignedTo.toString() !== user._id.toString()){
        return res.status(403).json({
            message: `User is not assigned to access task`
        })
    }

    if(task.status === "pending"){
        task.status = "in-progress";
    }else if(task.status === "in-progress"){
        task.status = "submitted";
    }else{
        return res.status(400).json({
            message: "Task cannot be updated"
        });
    }

    await task.save();

    res.status(200).json({
        message: `task status has been changed by ${user.name}`,
        data : task,
    })

} catch (error) {
    res.status(500).json({
        message: `server Error ${error}`
    })
}}

const taskReviewed = async(req,res) => {
try {
    const user = req.user;
    const { id, action} = req.params;
    
    if(!id){
        return res.status(401).json({
            message: `task id not found`
        });
    }

    const task = await taskModel.findById(id);

    if(!task){
        return res.status(403).json({
            message: "You are not allowed to modify this task"
        })
    }
  
    if(task.createdBy.toString() !== user._id.toString()){
        return res.status(403).json({
            message: `User is not assigned to access task`
        })
    }

    if(task.status !== "submitted"){
        return res.status(400).json({
            message: `wrong Task details kinldy check task`
        })
    }

    if(action === "approve"){
        task.status = "complete"
    }

    if(action === "reject"){
        task.status = "in-progress"
    }


    task.reviewedBy = user._id;
    task.reviewedAt = Date.now();
    await task.save();
    
    res.status(200).json({
        message: `task status has been changed by ${user.name}`,
        data : task,
    })

} catch (error) {
    res.status(500).json({
        message: `server Error ${error}`
    });
}}


const deleteTask = async(req, res) => {
try {
    const user = req.user;
    const id = req.params.id;
    
    if(!id){
        return res.status(401).json({
            message: `task id not found`
        });
    }

    const task = await taskModel.findById(id);

    if(!task){
        return res.status(404).json({
            message: "Task not found"
        });
    }

    if(task.createdBy.toString() !== user._id.toString()){
        return res.status(403).json({
            message: `User can only delete their tasks`
        })
    }

    await task.deleteOne();

    res.status(200).json({
        message: "Task deleted Sucessfully"
    })

} catch (error) {
    res.status(500).json({
        message: `server Error ${error}`
    })
}
}

module.exports = {taskCreation, seeTasks, taskCreatedByMe, getOneTask, updateTask, taskStatusUp, taskReviewed, deleteTask};