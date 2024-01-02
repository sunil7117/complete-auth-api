import mongoose from "mongoose";
const productSchema=new mongoose.Schema({
    product_name:{
        type:String,
        required:true,
    },
    product_color:{
        type:String,
    },
    product_tag:{
        type:String,
        required:true
    },
    product_price:{
        type:Number,
        required:true
    },
    product_ratting:{
        type:Number,
    },
    product_review:{
        type:String,
    },
    product_image:{
        type:String,
    },
    product_details:{
        type:String,
        required:true
    },
    product_stock:{
        type:Boolean,
    },
    product_weight:{
        type:String,
    },
    product_total:{
        type:Number,
        default:10
    },
    product_soldout:{
        type:Number,
        default:0
    }

},{timestamps:true})


const ProductModel= new mongoose.model("product",productSchema)
export default ProductModel