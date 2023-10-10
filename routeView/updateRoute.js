import express from 'express'
import { updateStatus } from '../controller/updateController.js'
import { verifyUser } from '../middleware/verifyUser.js'
const router=express.Router()

router.put('/update',verifyUser,updateStatus)
export default router