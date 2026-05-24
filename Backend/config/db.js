const mongoose = require("mongoose");
const dotenv = require("dotenv");


const connectDB = async(req,res)=>{
    try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`server is connect to database ${conn.connection.host}`);
    } catch (error) {
    console.error(`Database Error ${error}`);
    process.exit(1);
    }
}

module.exports = connectDB;
