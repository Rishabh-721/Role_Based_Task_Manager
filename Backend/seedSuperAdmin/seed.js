const dotenv = require("dotenv");
const userModel = require("../model/User.model")
const connectDB = require("../config/db");
const hashedpassword = require("../utils/hashing.utils");

dotenv.config();


const seedsuperadmin = async() => {
    try {
        await connectDB();
        const existSuperAdmin = await userModel.findOne({role: "super_admin"});

        if(existSuperAdmin){
            console.log("Super Admin already exists");
            process.exit()
        }

        const hashedPassword = await hashedpassword(process.env.SUPER_ADMIN_PASSWORD);

        await userModel.create({
            firstName: "Rishabh",
            lastName: "Rajput",
            email: process.env.SUPER_ADMIN_MAIL,
            password: hashedPassword,
            role: "super-admin",
            isActive: true,
            isVerified: false,
        })

        console.log("Super admin created successfully")

        process.exit()
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

seedsuperadmin();