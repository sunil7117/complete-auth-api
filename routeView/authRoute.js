import express  from "express";
const router=express.Router()
import { signin, signup,forgetPassword,verifyOTP, updatePassword, getuser, redirect } from "../controller/authController.js";
import { localVariable } from "../utils/localVariable.js";

// login
router.post('/signin',signin)

// signup
router.post('/signup',signup)


//middleware for forget password 
router.post('/forget',localVariable,forgetPassword)

// verify otp with middleware
router.post('/verifyOTP',verifyOTP)

//update password from middleware 
router.post('/updatepassword',updatePassword)

// Get a user for page redirect
router.get('/getuser',getuser)

// Get a user on redirect and get user data
router.post('/redirect',redirect)


export default router