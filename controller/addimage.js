import ProductModel from "../model/productmodel.js";
  

export const addimage=(req,res)=>{
    return res.send(req.file)
    try {
        req.app.locals={
            photo:req.file.filename,
        }
        return res.send(req.file)
    } catch (error) {
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
