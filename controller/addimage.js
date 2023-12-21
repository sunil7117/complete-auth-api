import ProductModel from "../model/productmodel.js";
  

export const addimage=(req,res)=>{
    try {
        req.app.locals={
            photo:req.file.filename,
        }
        res.send(req.file)
    } catch (error) {
        res.send(error)
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
