const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
        enum: { 
            values: ["super-admin", "admin", "employee"],
            message: '{VALUE} is not a valid role'
        },
        default: "employee",
    },
    isActive:{
        type: Boolean,
        default: false,
    },
    isBlocked:{
        type: Boolean,
        default: false,
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    sessionVersion:{
        type: Number,
        default: 0
    }
},{timestamps: true});

module.exports = mongoose.model("User", userSchema);