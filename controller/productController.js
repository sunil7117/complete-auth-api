import { CartModel } from "../model/cartModel.js"
import ProductModel from "../model/productmodel.js"
import UserModel from "../model/userModel.js"

// Add a product
export const addproduct=async(req,res)=>{
try {
    const photo=req.app.locals.photo
    if(photo===undefined){
        return res.send("please select an image")
    }
    const data=req.body
    data.product_image=photo
    const new_data=await ProductModel(data)
     new_data.save()
    return res.send("product added successfully")
} catch (error) {
    
}
}


export const allproduct=async(req,res)=>{
    try {
        const alldata=await ProductModel.find();
        return res.send(alldata)
    } catch (error) {
        res.status(500).json("someting error")
    }
}
export const product=async(req,res)=>{
    try {
        // console.log(req.params)
        const data=await ProductModel.find(req.params);
        res.send(data)

    } catch (error) {
        res.status(500).json("someting error")
    }
}
export const searchproduct=async(req,res)=>{
    try {
        // res.send(req.query)
        const data=await ProductModel.find(req.query);
        res.send(data[0])

    } catch (error) {
        res.status(500).json("someting error")
    }
}

// add a product in cart
export const addCart=async(req,res)=>{
    const _id=req.body._id
    const product_info=req.body.product_info
    console.log(req.body)
    // res.send(product_info)
    try {
        const updatedcart =await UserModel.findByIdAndUpdate({_id},
            { $push: { user_cart: { $each: [product_info] } } },
            { new: true })
        return res.send(updatedcart)
    } catch (error) {
        
    }
}