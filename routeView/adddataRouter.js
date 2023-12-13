import express  from "express";
import { addlist } from "../controller/addlist.js";
const router=express.Router()
router.post('/addlist',addlist)

export default router