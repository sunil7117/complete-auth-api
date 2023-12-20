import express  from "express";
import { addCart, deleteCart, getCart } from "../controller/userController.js";
const router=express.Router()


// store a cart 
router.put('/addcart/:cart_id',addCart)

// get a cart 
router.get('/getcart/:cart',getCart)

// delete a cart item from login user 
router.put('/deletecart/:cart_id',deleteCart)

// router.get('/deletecart/:_id',deletecartitem)


export default router;