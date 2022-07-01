import express from "express";
import {pool} from '../../server';

export const getProfilePicture = express.Router()


getProfilePicture.post("/api/getProfilePicture", (req,res)=>{

    const user_id = req.body['user_id']
    

    const getProfilePictureSQL = `
    SELECT image_url
    FROM user_image
    WHERE fk_image_user_id = ${user_id} AND image_type = 'profile_picture_selected'
    `
    pool.query(getProfilePictureSQL, (err,data)=>{
        if(err)throw err
    
        
        if(data[0]){
            res.send({image_url: data[0]['image_url']})
        }
        else{
            res.send({message: "image_url not found"})
        }
    })
    
})