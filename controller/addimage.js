import ProductModel from "../model/productmodel.js";
  

export const addimage=(req,res)=>{
    req.app.locals={
        photo:req.file.filename,
    }
    res.send(req.file)
    
}

export const getimage=async(req,res)=>{
    try {
        const data=await ProductModel.find(req.query)
        res.send(data)
    } catch (error) {
        
    }
}