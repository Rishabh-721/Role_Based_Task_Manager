const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const hashedpassword = require("../utils/hashing.utils");
const generateToken = require("../utils/generateToken.utils");

dotenv.config();

const signup = async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;

        if(!firstName ||!lastName || !email || !password){
            return res.status(400).json({
                message: `Please provide all required details for user Signup`
            })
        }

        const isExist = await userModel.findOne({email});

        if(isExist){
           return res.status(401).json({
            message: `User already exist in system kindly login`
           }) 
        }

        const hashedPassword = await hashedpassword(password);

        const user = {
            firstName, lastName, email, password : hashedPassword
        }

        await userModel.create(user);

        res.status(200).json({
            message: "User Created Sucessfully",
            data: user
        })
        

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        })
    }
    
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message: `Please provide all required details for user Login`
            })
        }

        const user = await userModel.findOne({email});

        if(!user){
            return res.status(401).json({
                message: `User is not in database kindly Sign_up to connect`
            })
        }

        if(!user.isActive){
            return res.status(404).json({
                message: "User access is deactivated kindly tell super-admin to activated access"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({
                message: `User deatails are invalid please provide correct user details`
            })
        }

        const now = new Date();
        const expiryDate = new Date();
        expiryDate.setDate(now.getDate() + 7);


        const data = {
            "sub": user.name,
            "userId": user._id,
            "userRole": user.role,
        }

        const time = "7d";

        const tokenVal = await generateToken(data, time);

        res.status(200).json({
            message: `User Logged in Sucessfully`,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                verified: user.isVerified,
                active: user.isActive,
            },
            token: `${tokenVal}`,
        })

    } catch (error) {
        res.status(500).json({
            message: `Server Error ${error.message}`
        })
    }
}

const getMe = (req, res) =>{
    res.status(200).json({
    success: true,
    user: req.user,
    });
};

module.exports = {signup, login, getMe};