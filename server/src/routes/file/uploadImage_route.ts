
import express from 'express';
import multer from 'multer'
import { ResizeImage } from './ResizeImage';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';


const upload = multer({
    limits: {
        filesize: 4* 1024 * 1024
    }
})

export const uploadImageRouter = express.Router()

uploadImageRouter.post("/api/uploadImage",upload.single('image'), (req, res)=>{
    
    const imgBaseName = uuidv4()
    const imagePath = path.join(__dirname, '../../files/images');
    const fileUpload = new ResizeImage(imagePath, imgBaseName);
    const filename =  fileUpload.save(req['file'].buffer);
    
    return res.status(200).json({ imgBaseUrl: filename });
})