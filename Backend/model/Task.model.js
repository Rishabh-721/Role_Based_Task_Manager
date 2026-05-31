const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
    },
    link:{
        type: String,
        required: true,
        trim: true,
    },
    type:{
        type: String,
        enum:{
            values: ["github", "docs", "excel", "other"],
            message: "{VALUE} is not a valid attachment type",
        },
        default: "other",
    }
},{_id: false});

const updateSchema = new mongoose.Schema({
    updatedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message:{
        type: String,
        required: true,
        trim: true,
    },

    attachments:[attachmentSchema],

},{timestamps: true});

const subTaskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
    },
    assignedTo:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],

    status:{
        type: String,
        enum:{
            values: ["pending", "in-progress","submitted", "complete"],
            message: "{VALUE} is not a valid status"
        },
        default: "pending",
    },

    updates:[updateSchema],
},{timestamps: true});

const TaskSchema = new mongoose.Schema({
    
    title:{
        type: String,
        required: true,
        trim: true,
    },

    description:{
        type: String,
        required: true,
        trim: true,
    },

    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    assignedTo:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],

    status:{
        type: String,
        enum:{
            values: ["pending", "in-progress","submitted", "complete"],
            message: "{VALUE} is not a valid status"
        },
        default: "pending",
    },

    dueDate:{
        type: Date,
        default: null,
    },

    isDaily:{
        type: Boolean,
        default: false,
    },

    resources:{
        type:[attachmentSchema],
        default: []
    },

    updates:{
        type:[updateSchema],
        default: []
    },
    subtasks:{
        type:[subTaskSchema],
        default: []
    }
},{
    timestamps: true,
});

TaskSchema.index({ assignedTo: 1 });
TaskSchema.index({ createdBy: 1 });
TaskSchema.index({ status: 1 });


module.exports = mongoose.model("Task", TaskSchema);