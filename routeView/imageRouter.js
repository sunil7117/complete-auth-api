import express  from "express";
import {addimage, getimage } from '../controller/addimage.js'
import multer from "multer";
const router=express.Router()

const storage = multer.diskStorage({
    destination:function(req,file,cb) {
        return cb(null,'./uploadphoto')
    },
    filename:function(req,file,cb){
     return cb(null,`${Date.now()}_${file.originalname}`)   
    }
})



// const upload = multer({ dest: 'images/' })
const upload = multer({storage:storage})

// upload a image
// http://localhost:8000/api/image/upload
router.post('/upload',upload.single('photo'),addimage)

router.get('/getimage',getimage)
export default router