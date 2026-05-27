const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const hashedpassword = require("../utils/hashing.utils");
const generateToken = require("../utils/generateToken.utils");
const { resetPassword, verifyUserMail } = require("../utils/sendMail.utils");

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
            "userId": user._id,
            "userRole": user.role,
            "purpose": "auth",
            "userSession": user.sessionVersion,
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

const forgotPassword = async(req, res) => {
    try {
        const {email} = req.body;
        
        if(!email){
            return res.status(400).json({
                message: `user email is required`
            })
        }

        const user = await userModel.findOne({email})

        if(!user){
            return res.status(400).json({
                message: `user is not in database kindly provide correct email id`,
            })
        }

        if(!user.isVerified){
            return res.status(400).json({
                message: `user is not verified kindly verify user to change password or if wrong email kindly connect to admin`
            });
        }

        const data = {
            "userId": user._id,
            "purpose": "password-change"
        }

        const token = await generateToken(data, "1h");

        const resetlink = `http://localhost:5000/user/auth/verify/${token}`;

        await resetPassword(user.email, resetlink);

        res.status(200).json({
            message: `password reset mail has been sent kindly check user email`
        })
    } catch (error) {
        res.status(500).json({
            message: `Server Error ${error.message}`
        })
    }
}

const verifyMailing = async(req, res) => {
    try {
        const email = req.body.email;

        if(!email){
            return res.status(400).json({
                message: `User is required to provide mail for user verification without login`
            });
        }

        const user = await userModel.findOne({email});

        if(user.isVerified){
            return res.status(400).json({
                message: `User is already verified kindly check user info to confirm`
            })
        }

        const data = {
            "userId": user._id,
            "purpose": "verify-email"
        }

        const token = await generateToken(data, "1h");

        const verifyLink = `http://localhost:5000/user/auth/changePassword/${token}`;

        await verifyUserMail(email, verifyLink);


        res.status(200).json({
            message: `User has been sent verification mail on user email`
        })

    } catch (error) {
        res.status(500).json({
            message: `Server Error ${error.message}`
        }) 
    }
}

const userVerification = async(req, res) => {
    try {
        const {token} = req.params;

        if(!token){
            return res.status(400).json({
                message: `wrong token or token has been expired reverify with new token`
            });
        }

        const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
        );

        if(decoded.purpose !== "verify-email"){
            return res.status(401).json({
                message: `token is invalid not for email verification purpose`
            })
        }
        
        
        const userId =  decoded.userId;

        if(!userId){
            return res.status(400).json({
                message: `UserId not found cause incorrect token value please check token again`
            })
        }

        const user = await userModel.findById(userId);

        if(!user){
             return res.status(400).json({
                message: `User not found cause incorrect userId check token again`
            })
        }

        user.isVerified = true ;

        await user.save();

        return res.status(200).json({
            message: "User verified successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: `Server Error ${error.message}`
        })
    }   
}

const changePassword = async(req, res) => {
    try {
    const {token} = req.params;

    if(!token){
        return res.status(400).json({
                message: `wrong token or token has been expired changePassword with new token`
            });
    }

    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    );

    if(decoded.purpose !== "password-change"){
            return res.status(401).json({
                message: `token is invalid not for password changing purpose`
        })
    }    
        
    const userId =  decoded.userId;

    if(!userId){
            return res.status(400).json({
                message: `UserId not found cause incorrect token value please check token again`
            })
    }

    const user = await userModel.findById(userId);

    if(!user){
        return res.status(400).json({
            message: `user is not in database so can't change password`
        });
    }


    if(!user.isVerified){
        return res.status(400).json({
            message: `user is not verified kindly verify user to change password or if wrong email kindly connect to admin`
        });
    }

    const {newPassword, confirmPassword} = req.body;

    if(newPassword !== confirmPassword){
        return res.status(401).json({
            message: `Password mismatch kindly provide same password for both field`
        })
    }

    const setpassword = await hashedpassword(confirmPassword);

    if(!setpassword){
        return res.status(401).json({
            message: `Password is not hashing kindly check password info`
        });
    }

    user.password = setpassword;
    user.sessionVersion += 1;
    await user.save();

    res.status(200).json({
        message: `User password is changed sucessfully`,
        data: user
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

const userLogout = async(req, res) => {
    try {
        const user = req.user; 

        if(!user){
            message: `no user found there is no user in database`
        }

    user.sessionVersion += 1;
    await user.save();

    res.status(200).json({
        message: `user logged out sucessfully`
    })

    } catch (error) {
        res.status(500).json({
            message: `Server Error ${error.message}`
        })
    }
   
}

module.exports = {signup, login, getMe, forgotPassword, verifyMailing, userVerification, changePassword};