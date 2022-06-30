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
        if(err){
            console.log(err)
            res.send({message: err.message})
            return
        };
        
        if(data[0]){
            console.log("Sending image_url")
            res.send({image_url: data[0]['image_url']})
        }
        else{
            console.log(`Image_url not found for user_id : ${user_id}`)
            res.send({message: "image_url not found"})
        }
    })

    console.log(req.body)
    
})