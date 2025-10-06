import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
    },
    password : String,
    username:String,
    
},{Timestamp:true})