import { CartModel, UserModel } from "../model/userModel.js"

export const addCart=async(req,res)=>{
    const prod_id=req.body.product_id
    console.log({prod_id})
    try {
        const cart= await CartModel.findOneAndUpdate({_id:req.params.cart_id},{$push:{items:prod_id}},{new:true})
        console.log(cart)
        res.status(200).json({cartItem:cart.items,message:"cart added successfully"})
    } catch (error) {
        res.status(500).send("internal error ")
    }
}



export const getCart=async(req,res)=>{
    console.log(req.params)
    try {
    const user=await CartModel.find({_id:req.params.cart}).populate('items')
    res.send(user[0].items)
    } catch (error) {
        res.send(error)
    }
}





// delete a cart item
export const deleteCart=async(req,res)=>{
    const prod_id=req.body.product_id
    console.log({prod_id})
    try {
        const cart= await CartModel.findOneAndUpdate({_id:req.params.cart_id},{$pull:{items:prod_id}},{new:true})
        // console.log(cart)
        res.status(200).json({cartItem:cart.items,message:"Item removed from cart"})
    } catch (error) {
        res.status(500).send("internal error ")
    }
}