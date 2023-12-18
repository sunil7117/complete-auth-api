import bcrypt, { genSalt } from "bcrypt";
import jwt  from "jsonwebtoken";

import otpGenerator from 'otp-generator'
import {CartModel, UserModel} from "../model/userModel.js";
import { tokenModel } from "../model/tokenModel.js";
import { mailer } from '../utils/nodemailer.js';


// Let signin a user with auth facility and redirect
// http://localhost:8000/api/auth/signin
export const signin=async(req,res)=>{
    const ACCESSTOKEN=process.env.ACCESSTOKEN
    const REFRESHTOKEN=process.env.REFRESHTOKEN
    const user=await UserModel.findOne({email:req.body.email})
    try {
        if(!user){
        return res.status(404).json("email/password not matched not fouund")
    }
    try {
        const {password,...userdata}=user.toJSON()
        const compare=await bcrypt.compare(req.body.password,user.password)
        if(compare){
            const accessToken=jwt.sign(userdata,ACCESSTOKEN,{expiresIn:'1m'})
            const refreshToken=jwt.sign(userdata,REFRESHTOKEN)
            const saveToken=new tokenModel({token:refreshToken})
            await saveToken.save()
            return res.status(200).json({accessToken:accessToken,refreshToken:refreshToken,userdata})
        }
        return res.status(403).json("email/password not matched")
    } catch (error) {
        console.log("signup api runing but some problems happens")  
    }    
} catch (error) {
    console.log("Not runing singup api")
}
}

// http://localhost:8000/api/auth/signup
export const signup=async(req,res)=>{
        try {
            const {password,...userinput}=req.body
            console. log(userinput)
            const salt=await bcrypt.genSalt(10)
            console. log("noot ")
            const hash=await bcrypt.hash(password,salt)
            const newData={...userinput,"password":hash}
            // userdata for databse
            const data=new UserModel(newData)
            const saveData= await data.save(data)
            // cart for user
            const cart=CartModel({
                user_id:saveData._id,
                item:[]
            })
            await cart.save()
            return res.status(200).json("user register successfull...")
        } catch (error) {
            return  res.status(500).json(error)
        }
    
}

// http://localhost:8000/api/auth/forget
export const forgetPassword=async(req,res)=>{       
    try {
    // Let's Generate a OTP
    const OTP=otpGenerator.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})
    console.log(OTP)            /* comment this line in production*/
    const user=await UserModel.findOne({email:req.body.email})
    if(!user){
        return res.status(404).json("this user not register with us.")
    } 
    const mail= await mailer({OTP:OTP,Email:req.body.email})
    req.app.locals={
        OTP:OTP,
        resetSession:true,
        email:req.body.email
    }
    return res.status(200).json(mail)   
} catch (error) {
    return res.status(200).json("Please try again latter! network issue")
    }    
    
}

// http://localhost:8000/api/auth/verifyOTP
export const verifyOTP=(req,res)=>{
const userOTP=req.body.code
try {
    if(parseInt(req.app.locals.OTP)===parseInt(userOTP)){
        res.status(200).json("successful")
        req.app.locals.OTP=null
       } else{
        res.status(401).json("Unvalid or expired OTP")
        }  
    } catch (error) {
        console.log(error)
    }
}

// http://localhost:8000/api/auth/updatepassword
export const updatePassword=async(req,res)=>{
   const email=req.app.locals.email
   console.log(email)
    try {
        const salt=await bcrypt.genSalt(10)
        const hash=await bcrypt.hash(req.body.password,salt)
        if(email){
            const user=await UserModel.findOneAndUpdate({email},{password:hash},{new:true})
            console.log(user)
            req.app.locals={
                resetSession:false,
                email:null
            }
            return res.status(200).json("password changed successfully!.")
        }
        return res.status(404).json("email and OTP validation not successfull!.")
          
    } catch (error) {
        console.log(error)
    }
}



// get a user card detail 
// http://localhost:8000/api/auth/getuser 
export const getuser=async(req,res)=>{
    try {  
        // const getuser=await UserModel.findById(req.body._id)
        const getuser=await UserModel.findOne(req.body)
    if(getuser){
        const{password,...userdata}=getuser.toJSON()
        return res.status(200).send(userdata.user_cart)       
    }

    } catch (error) {
        console.log(error)
    }
}
