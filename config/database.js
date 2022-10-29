const mongoose = require("mongoose")

const {MONGODB_URL} = process.env

//its just defining inside a variable so that other functions can use `connect`
exports.connect = () =>{

    mongoose.connect(MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true     
    })
    .then(
        console.log(`DB connected sucessfully`)
    )
    .catch( (error)  => {
        console.log(`DB connection failed`)
        console.log(error)
        process.exit(1)
    }) //this always returns a promise so it should be handeld
}