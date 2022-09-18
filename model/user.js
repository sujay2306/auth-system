const mongoose = require("mongoose")
//all object inside schema are object
const UserSchema = new mongoose.Schema({

    firstname:{
        type: String,
        default: null,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, "this is required"]
    },

    password:{
        type: String
    },

    token: {
        type: String
    }
  

})