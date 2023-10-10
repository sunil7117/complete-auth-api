import mongoose from "mongoose";
const tokenSchema=new mongoose.Schema({
    token:{
        type:String,
        required:true
    }
})
export const tokenModel=new mongoose.model("token",tokenSchema)