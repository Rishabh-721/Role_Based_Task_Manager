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
    dueDate: {
        type: Date,
        default: null,
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
    },
    resources: {
        type: [resourceSchema],
        default: []
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    }
},{timestamps: true});

taskSchema.index({ createdBy: 1 });
taskSchema.index({ assignedTo: 1 });
taskSchema.index({ dueDate: 1 });
taskSchema.index({ status: 1});
taskSchema.index({ reviewedBy: 1});

module.exports = mongoose.model("Task", taskSchema);