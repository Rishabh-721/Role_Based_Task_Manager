const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.json());

app.get("/", async(req, res) => {
    await res.send(`<h1>Apis are working</h1>`);
});

app.listen(port, res => {
    console.log(`server is running on port: ${port}`)
})