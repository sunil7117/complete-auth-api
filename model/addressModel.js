import mongoose from "mongoose";

// addressSchema
const addresslistSchema = new mongoose.Schema(
  {
    addresslists:[
      
      {
        name:{
          type:String,
          required:true
        },
        mobile:{
          type:Number,
          required:true
        },
        pincode:{
          type:Number,
          required:true
        },
        locality:{
          type:String,
        },
        add:{
          type:String,
        },
        city:{
          type:String,
        },
        state:{
          type:String,
        },
        landmark:{
          type:String,
        },
        altnumber:{
          type:Number,
        },
      }
    ]
  },
    
  { timestamps: true }
);
export const addressModel = mongoose.model("addresslist", addresslistSchema);
