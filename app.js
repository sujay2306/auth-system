
require("dotenv").config();
require('./config/database').connect() //connecting to DB
const express = require("express");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
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

    try{
        const {firstname, lastname, email, password} = req.body;

    if(!(email && firstname && lastname && password)){
        res.status(400).send("All fields are required");
    }

    const existingUser = await User.findOne({ email })
        if (existingUser){
            res.status(401).send("user already exists")
        }
    const myEncryptPassword = await bcrypt.hash(password, 10) //how many rounds of hash

    //creating a oobject
    const user = await User.create({
        firstname,
        lastname,
        email: email.toLowerCase(),
        password: myEncryptPassword
    })

    //token creation
    const token = jwt.sign(
        {user_id: user._id, email},//inside db obj name and _id, passing algorithm and when it shuld expire 
        process.env.SECRET_KEY, 
        {
            expiresIn: "2h"
        }
    )

    user.token = token
    //update or not in DB
    //Handle password situation
    user.password = undefined

    res.status(201).json(user)
    }
    catch(error){
        console.log(error);
    }
});

app.post("/login", async (req, res) => {
    try{
        //expected input
        const {email, password} = req.body

        if(!(email && password)){
            res.status(400).send("Field is Missing")
        }
        //User is comming from the Model

        const user =  await User.findOne({email})
        // if (!user){
        //     res.status(400).send("You are not registered in our app")
        // }

        //To compare UserName and password at the same time
        if (user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign(
                {user_id : user._id, email},
                process.env.SECRET_KEY,
                {expiresIn: "2h"}
            )
            //Since Token is not in DB
            user.token = token
            user.password = undefined
            res.status(200).json(user)
        }

        res.status(400).send("email or password is incorrect")

    }

    catch(error){
        console.log(error);
    }
})

module.exports = app;