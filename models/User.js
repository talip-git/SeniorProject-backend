const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        max:25,
        min:8
    },
    email:{
        type:String,
        max:50,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:8,
        max:25
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
},{timestamps:true});

module.exports = mongoose.model("User",UserSchema);