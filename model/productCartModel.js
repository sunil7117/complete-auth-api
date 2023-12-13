import mongoose from "mongoose";

 const productCartSchema= new mongoose.Schema({
    product_cart:{
        type:Array,
    }

})
const productCartModel=new mongoose.model("productcart",productCartSchema)
export default productCartModel