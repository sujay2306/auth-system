
require("dotenv").config();
require('./config/database').connect() //connecting to DB
const express = require("express");
const User = require("./model/user")
const app = express();
app.use(express.json());

//1. get all info
//2.check mandatory fields
//3.take care of already reg users
//3.take care of password
//4. generate tokens or send success ms
app.get("/",(req, res) => {
    res.send( "<h1>Hello from Auth System </h1>" );
});



app.post("/register", async (req,res) => {
    const {firstname, lastname, email, password} = req.body;

    if(!(email && firstname && lastname && password)){
        res.status(400).send("All fields are required");
    }

    const existingUser = await User.findOne({ email })
        if (existingUser){
            res.status(401).send("user already exists")
        }
});

module.exports = app;