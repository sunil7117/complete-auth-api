import express  from "express";
import { signin, signup,forgetPassword,verifyOTP } from "../controller/authController.js";
import { localVariable } from "../utils/localVariable.js";
const router=express.Router()

router.post('/signin',signin)
router.post('/signup',signup)
router.post('/forget',localVariable,forgetPassword)
router.post('/verifyOTP',verifyOTP)
export default router