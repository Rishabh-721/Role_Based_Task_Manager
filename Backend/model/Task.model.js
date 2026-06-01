const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
    },
    link:{
        type: String,
        required: true,
        trim: true,
    }
},{_id: false});

const assignedUserSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status:{
        type: String,
        enum: ["pending","in-progress","submitted","complete"],
        default: "pending",
    },
    reviewedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    reviewedAt:{
        type: Date,
        default: null,
    }
}, {_id: false});


const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isPublic:{
        type: Boolean,
        default: false,
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high", "urgent"],
        default: "low",
    },
    dueDate: {
        type: Date,
        default: null,
    },
    isDaily: {
        type: Boolean,
        default: false,
    },
    resources: {
        type: [resourceSchema],
        default: []
    },
    assigned: {
        type: [assignedUserSchema],
        default: [],
    }
},{timestamps: true});

taskSchema.index({ createdBy: 1 });
taskSchema.index({ "assigned.user": 1 });
taskSchema.index({ dueDate: 1 });

module.exports = mongoose.model("Task", taskSchema);