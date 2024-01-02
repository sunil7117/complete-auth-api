import mongoose, { Schema } from "mongoose";
// Cart schema
const cartSchema = new mongoose.Schema(
  {
   items:[
    {
      type:Schema.Types.ObjectId,
      ref:'product'
    }
   ]     
  },
  { timestamps: true }
);
export const CartModel = mongoose.model("cart", cartSchema);

// user schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      max: 20,
      unique: true,
      required:true
    },
    password: {
      type: String,
      required: true,
      max: 20,
      min: 3,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
    },
    dob: {
      type: String,
      require: true,
    },
    role:{
      type:String,
    },
    cart:{
      type:Schema.Types.ObjectId,
      ref:'cart'
    },
    addresslist:{
      type:Schema.Types.ObjectId,
      ref:'addresslist'
    },
   },
  { timestamps: true }
);
export const UserModel = mongoose.model("user", userSchema);

