import express  from "express";
import { addCart } from "../controller/userController.js";
const router=express.Router()


// store a cart 
router.post('/addcart/:user_id',addCart)

// delete a cart item from login user 
// router.get('/deletecart/:id',deletecartitem)


export default router;