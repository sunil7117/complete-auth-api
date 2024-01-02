import { addressModel } from "../model/addressModel.js"
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




// http://localhost:8000/api/user/getcart/12364
export const getCart=async(req,res)=>{
    console.log(req.params)
    try {
        const user=await CartModel.find({_id:req.params.cart}).populate('items')
    res.send(user[0].items)
    } catch (error) {
        res.send(error)
    }
}


// http://localhost:8000/api/user/getcart/12364             No use of this code
export const getAllCart=async(req,res)=>{
    console.log(req.params)
    try {
        const user=await CartModel.findOne({_id:req.params.cart}).populate('items')
    res.send(user[0].items)
    } catch (error) {
        res.send(error)
    }
}


// http://localhost:8000/api/user/count/12364             No use of this code
export const count=async(req,res)=>{
    console.log("count")
    try {
        const user=await CartModel.find({_id:req.params.cart}).populate('items')
        res.send(user[0].items)
    } catch (error) {
        res.send(error)
    }
}



// http://localhost:8000/api/user/addaddress,{id,data}             No use of this code
export const addaddress=async(req,res)=>{
    const addresslistId=req.params.id
    try {
        const address=await addressModel.findOneAndUpdate({_id:addresslistId},{$push:{addresslists:req.body}},{new:true})
        res.send(address)
    } catch (error) {
        res.send(error)
    }
}


// http://localhost:8000/api/user/updateaddress,{id,data}             No use of this code
export const updateaddress=async(req,res)=>{
    const addresslistId=req.params.id
    const {_id,...update}=req.body
    try {
        const updated=await addressModel.findOneAndUpdate({_id:addresslistId,'addresslists._id':_id},{$set:{'addresslists.$':{...update,_id}}},{new:true})
        res.send(updated)
    } catch (error) {
        res.send(error)
    }
}


// http://localhost:8000/api/user/getaddress,{id,data}             No use of this code
export const getaddress=async(req,res)=>{
    const addresslistId=req.params.id
    try {
        const address=await addressModel.findOne({_id:addresslistId})
        res.send(address)
    } catch (error) {
        res.send(error)
    }
}



