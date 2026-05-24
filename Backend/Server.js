const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./router/auth.router");

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.json());

connectDB();

app.get("/", async(req, res) => {
    await res.send(`<h1> apis are working on port: ${port} and on database : ${process.env.MONGO_URL}</h1>`);
});

app.use("/user/auth", authRoutes);

app.listen(port, res => {
    console.log(`server is running on port: ${port}`)
})

