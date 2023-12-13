import mongoose from "mongoose";
import { cartSchema } from "./cartModel.js";
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
    
    user_cart:{
      type:Array,
      default:[]
    },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("user", userSchema);
export default UserModel;
