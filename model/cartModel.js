import mongoose from "mongoose";

export const cartSchema=new mongoose.Schema({
    carts:{
        type:String
    }
})

export const CartModel=new mongoose.model('cart',cartSchema)