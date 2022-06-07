
import express from 'express';
import multer from 'multer'
import { ResizeImage } from './ResizeImage';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import {pool} from '../../server'



const upload = multer({
    limits: {
        filesize: 4* 1024 * 1024
    }
})

export const uploadImageRouter = express.Router()

uploadImageRouter.post("/api/uploadImage",upload.single('image'), (req, res)=>{

    console.log('/api/uploadImage')

    if(req['file'].buffer){   
        console.log(req['file'])
        const imgBaseName = uuidv4()
        const imagePath = path.join(__dirname, '../../files/images');
        const fileUpload = new ResizeImage(imagePath, imgBaseName);
        const filename =  fileUpload.save(req['file'].buffer);
        // write image data to database
        
            const user_id = req['file'].originalname
            const image_url = imgBaseName
            const image_type = 'profile_picture_selected'
            const image_description = "This is my profile picture"
        




        pool.getConnection((err, connection)=>{

            const deselectProfilePictureSQL = `
                UPDATE user_image
                SET image_type = 'profile_picture'
                WHERE image_type = 'profile_picture_selected' AND fk_image_user_id = ${user_id}
            `

            const addProfilePictureSQL = `
            INSERT INTO user_image (
                fk_image_user_id,
                image_url,
                image_type,
                image_description,
                date_of_creation
            )
            VALUES (
                (SELECT user_id FROM user_profile WHERE user_id = '${user_id}'),
                '${image_url}',
                '${image_type}',
                '${image_description}',
                now()
            )
            `


            connection.query(deselectProfilePictureSQL, (err, data)=>{
                if (err) throw err;
                console.log(data)
            })

            connection.query(addProfilePictureSQL, (err, data)=>{
                if(err) throw err;
                console.log(data)
                res.status(200).json({ imgBaseUrl: filename });
            })

            if (err) throw err;

            connection.release()
        })

    }
})