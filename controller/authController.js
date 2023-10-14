import bcrypt, { genSalt } from "bcrypt";
import jwt  from "jsonwebtoken";

import otpGenerator from 'otp-generator'
import UserModel from "../model/userModel.js";
import { tokenModel } from "../model/tokenModel.js";
import { mailer } from '../utils/nodemailer.js';
export const signin=async(req,res)=>{
    const ACCESSTOKEN=process.env.ACCESSTOKEN
    const REFRESHTOKEN=process.env.REFRESHTOKEN
    console.log(req.body.email)
    const user=await UserModel.findOne({email:req.body.email})
    console.log(user)
    try {
        if(!user){
        return res.status(404).json("email/password not matched not fouund")
    }
    try {
        const {password,...userdata}=user.toJSON()
        const compare=await bcrypt.compare(req.body.password,user.password)
        if(compare){
            const accessToken=jwt.sign(userdata,ACCESSTOKEN,{expiresIn:'5m'})
            const refreshToken=jwt.sign(userdata,REFRESHTOKEN)
            const saveToken=new tokenModel({token:refreshToken})
            await saveToken.save()
            return res.status(200).json({accessToken:accessToken,refreshToken:refreshToken,userdata})
        }
        return res.status(403).json("email/password not matched")
    } catch (error) {
        console.log(error)  
    }    
} catch (error) {
    console.log(error)
}
}
export const signup=async(req,res)=>{
    try {
        const {password,...userinput}=req.body
        const salt=await bcrypt.genSalt(10)
        const hash=await bcrypt.hash(password,salt)
        const newData={...userinput,"password":hash}
        const data=new UserModel(newData)
        const saveData= await data.save(data)
        return res.status(200).json("user register successfull...")
    } catch (error) {
        return res.status(409).json(error)
    }

}
export const forgetPassword=async(req,res)=>{       
    try {
    // Let's Generate a OTP
    const OTP=otpGenerator.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})
    const user=await UserModel.findOne({email:req.body.email})
    if(!user){
        return res.status(404).json("this user not register with us.")
    } 
    const mail= await mailer({OTP:OTP,Email:req.body.email})
    req.app.locals.OTP=OTP
    return res.status(200).json(mail)   
} catch (error) {
    return res.status(200).json("sunil")
    }    
    
}
export const verifyOTP=(req,res)=>{
const userOTP=req.body.code
    try {
        if(parseInt(req.app.locals.OTP)===parseInt(userOTP)){
            res.status(200).json("successful")
            req.app.locals.OTP=null
            // req.app.locals.reset=
        } else{
            res.status(401).json("Unvalid or expired OTP")
        }  
    } catch (error) {
        console.log(error)
    }
}