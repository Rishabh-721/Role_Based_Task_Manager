const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./router/auth.router");
const userRoutes = require("./router/user.router");
const taskRoutes = require("./router/task.router");

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.json());

connectDB();

app.get("/", async(req, res) => {
    await res.send(`<h1> apis are working on port: ${port} and on database : ${process.env.MONGO_URL}</h1>`);
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/task", taskRoutes);

app.listen(port, res => {
    console.log(`server is running on port: ${port}`)
})

