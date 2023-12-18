import {UserModel} from "../model/userModel.js"

export const updateStatus=async(req,res)=>{
    try {
        const user=req.user
        const update=req.body
        const updateData=await UserModel.findOneAndUpdate({email:user.email},update,{new:true})
        res.send(updateData)
    } catch (error) {
        res.send(error)
    }
}