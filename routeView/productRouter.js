import express  from "express";
const router=express.Router()
import { addCart, addproduct, allproduct, deletecartitem, product, searchproduct } from "../controller/productController.js";


// get a list of all products
router.get('/',allproduct)

// get a list by search type
router.get('/search',searchproduct)

// get a list based on id
router.get('/p_id/:_id',product)


// add a product 
router.post('/addproduct',addproduct)



export default router;