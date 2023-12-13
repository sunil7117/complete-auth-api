import express  from "express";
import { addCart, addproduct, allproduct, product, searchproduct } from "../controller/productController.js";

const router=express.Router()

// get a list of all products
router.get('/',allproduct)

// get a list of all products
router.get('/',allproduct)

// get a list based on id
router.get('/p_id/:_id',product)

// get a list based on name
router.get('/search',searchproduct)

// add a product 
router.post('/addproduct',addproduct)

// store a cart 
router.post('/addcart',addCart)

export default router;