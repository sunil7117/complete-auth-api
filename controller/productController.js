import jwt  from "jsonwebtoken";
import ProductModel from "../model/productmodel.js"
import {UserModel} from "../model/userModel.js"

// get all product
// http://localhost:8000/api/product
export const allproduct=async(req,res)=>{
    try {
        const alldata=await ProductModel.find();
        return res.send(alldata)
    } catch (error) {
        res.status(500).json("someting error")
    }
}

// Search product list based on search types
// http://localhost:8000/api/product/search?_id=123
export const searchproduct=async(req,res)=>{
    try {
        // res.send(req.query)
        const data=await ProductModel.find(req.query);
        // res.send(data[0])
        res.send(data)


    } catch (error) {
        res.status(500).json("someting error")
    }
}

// get a product with id 
// http://localhost:8000/api/product/p_id/123
export const product=async(req,res)=>{
    try {
        console.log(req.params)
        const data=await ProductModel.find(req.params);
        res.send(data[0])

    } catch (error) {
        res.status(500).json("someting error")
    }
}

// Add a product and two these two routers
// http://localhost:8000/api/image/upload
// http://localhost:8000/api/product/addproduct
export const addproduct=async(req,res)=>{
const headerToken=req.headers.authorization
   try {
        const token=headerToken?.split(" ").pop()
        const decode= jwt.verify(token,process.env.ACCESSTOKEN)
        // const decode= jwt.verify(token,process.env.REFRESHTOKEN)
        if(decode.user_type==='admin'){
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
        return res.send("you are not a authorized user")
    } catch (error) {
      return res.send(error.message)  
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


// Delete a cart item from user cart
export const deletecartitem=async(req,res)=>{
    const id=req.params.id
    // res.send(product_info)
    try {                                                   
        const deletecart =await UserModel.user_cart.find({_id:"657286ad9d3240974f6ba3ed"})
        // res.send(id)
        return res.send(deletecart)
    } catch (error) {
        
    }
}