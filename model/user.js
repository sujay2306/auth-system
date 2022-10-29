const mongoose = require("mongoose")
//all object inside schema are object

const userSchema = new mongoose.Schema({

    firstname:{
        type: String,
        default: null,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password:{
        type: String
    },

    token: {
        type: String
    }
  

});

//we are sending this as a model
module.exports = mongoose.model("user", userSchema) //we can call this model as user and it is follwoing userSchema 