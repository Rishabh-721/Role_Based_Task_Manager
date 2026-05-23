const mongoose = require("mongoose");
const dotenv = require("dotenv");


const connectDB = async(req,res)=>{
    try {
    const conn = await new mongoose.connect(process.env.MONGO_URL);
    console.log(`server is connect to database ${conn.connection.host}`);
    process.exit(0);
    } catch (error) {
    console.error(`Database Error ${error}`);
    process.exit(1);
    }
}

module.exports = connectDB;
