import { CartModel, UserModel } from "../model/userModel.js"

export const addCart=async(req,res)=>{
    try {
        const usercart= await CartModel.findOne(req.params)
        if(!usercart){
            return res.send("cart not found")
        }
        usercart.item.push(item)
        await usercart.save()
        res.send("item added to cart")
    } catch (error) {
        
    }
}