import jwt  from "jsonwebtoken";
import ProductModel from "../model/productmodel.js"

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
        if(decode.role==='admin'){
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
