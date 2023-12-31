import bcrypt, { genSalt } from "bcrypt";
import jwt  from "jsonwebtoken";

import otpGenerator from 'otp-generator'
import {CartModel, UserModel} from "../model/userModel.js";
import { tokenModel } from "../model/tokenModel.js";
import { mailer } from '../utils/nodemailer.js';
import { addressModel } from "../model/addressModel.js";


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
            const accessToken=jwt.sign(userdata,ACCESSTOKEN,{expiresIn:'5m'})
            const refreshToken=jwt.sign(userdata,REFRESHTOKEN)
            const saveToken=new tokenModel({token:refreshToken})
            await saveToken.save()
            console.log("user found")
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
            const salt=await bcrypt.genSalt(10)
            const hash=await bcrypt.hash(password,salt)
             
            if(userinput.role==='admin'){
                const data={...userinput,"password":hash}
                const admin=new UserModel(data)
                await admin.save()
                return res.status(200).json("user register successfull...")
            }else{
                 // cart for user
                const cart=CartModel({
                    items:[]
                })
                const addresslist=addressModel({
                    addresslist:[]
                })
                const data={...userinput,"password":hash,cart,addresslist}
                const newuser=new UserModel(data)
                // userdata for databse
                await cart.save()
                await addresslist.save()
                await newuser.save()
                 return res.status(200).json("user register successfull...")
            }
            
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

// Redirect a user 
// http://localhost:8000/api/auth/redirect,{bodydata}
export const redirect=(req,res)=>{
const token=req.body.token
    try {
        const user=jwt.verify(token,process.env.REFRESHTOKEN)
        res.status(200).json(user)
} catch (error) {
        res.send(error)   
}
}