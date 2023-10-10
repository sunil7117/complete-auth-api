import express from 'express'
import { updateStatus } from '../controller/updateController.js'
const router=express.Router()

router.put('/update',updateStatus)
export default router