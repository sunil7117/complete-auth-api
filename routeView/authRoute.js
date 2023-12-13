import express  from "express";
const router=express.Router()
import { signin, signup,forgetPassword,verifyOTP, updatePassword, getuser } from "../controller/authController.js";
import { localVariable } from "../utils/localVariable.js";

router.post('/signin',signin)
router.post('/signup',signup)
router.post('/forget',localVariable,forgetPassword)
router.post('/verifyOTP',verifyOTP)
router.post('/updatepassword',updatePassword)
router.get('/getuser',getuser)
export default router