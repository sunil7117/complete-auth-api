import { prodData } from "../constant/data.js"
import ProductModel from "../model/productmodel.js"

export const addlist=async(req,res)=>{
    try {
        const d=ProductModel.insertMany(prodData)
        // const sav=await d.save()
        res.send("data saved successfully")
    } catch (error) {
        return res.status(500).json(error)
    }
}