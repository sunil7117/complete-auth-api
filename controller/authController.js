
import bcrypt, { genSalt } from "bcrypt";
import jwt  from "jsonwebtoken";
import UserModel from "../model/userModel.js";
import { tokenModel } from "../model/tokenModel.js";
export const signin=async(req,res)=>{
    const ACCESSTOKEN=process.env.ACCESSTOKEN
    const REFRESHTOKEN=process.env.REFRESHTOKEN
    
    try {
    const user=await UserModel.findOne({email:req.body.email})
    const {password,...userdata}=user.toJSON()
    if(!user){
        return res.status(404).json("email/password not matched not fouund")
    }
    try {
        const compare=await bcrypt.compare(req.body.password,user.password)
        if(compare){
            const accessToken=jwt.sign(userdata,ACCESSTOKEN,{expiresIn:'5m'})
            const refreshToken=jwt.sign(userdata,ACCESSTOKEN)
            const saveToken=new tokenModel({token:refreshToken})
            await saveToken.save()
            return res.status(200).json({accessToken:accessToken,refreshToken:refreshToken,userdata})
        }
        return res.status(404).json("email/password not matched")
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
        return res.json({"code":error.code,"keyPattern":error.keyPattern,"keyValue":error.key})
    }

}