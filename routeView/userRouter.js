import express  from "express";
import { addCart, addaddress, count, deleteCart, getAllCart, getCart, getaddress, updateaddress } from "../controller/userController.js";
const router=express.Router()


// store a cart 
router.put('/addcart/:cart_id',addCart)

// get a cart 
router.get('/getcart/:cart',getCart)


// get all cart 
router.get('/getallcart/:cart',getAllCart)

// delete a cart item from login user 
router.put('/deletecart/:cart_id',deleteCart)


// change user selected cart product value 
router.put('/count/:product_id',count)

// router.get('/deletecart/:_id',deletecartitem)


// add a address for deliver item
router.post('/addaddress/:id',addaddress)

// update a address for deliver item
router.put('/updateaddress/:id',updateaddress)

// get all address of deliver item
router.get('/getaddress/:id',getaddress)

export default router;