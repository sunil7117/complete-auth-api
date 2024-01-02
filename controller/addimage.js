import ProductModel from "../model/productmodel.js";
  

export const addimage=(req,res)=>{
    console.log("hello image")
    console.log(req.file)
    try {
        req.app.locals={
            photo:req.file.filename,
        }
        console.log("image uploaded")
        return res.send(req.file)
    } catch (error) {
        console.log("image uploading failed")
        return res.send(error)
    }
    
}

export const getimage=async(req,res)=>{
    try {
        console.log("hello buddy")
        const data=await ProductModel.find(req.query)
        res.send(data)
    } catch (error) {
        
    }
}
