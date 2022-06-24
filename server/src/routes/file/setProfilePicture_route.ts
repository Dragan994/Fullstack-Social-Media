import express from "express";

import {pool} from '../../server'

export const setProfilePicture = express.Router()


setProfilePicture.post("/api/setProfilePicture", (req,res)=>{

    const {user_id, imgBaseUrl} = req.body



    const deselectProfilePictureSQL = `
                UPDATE user_image
                SET image_type = 'profile_picture'
                WHERE image_type = 'profile_picture_selected' AND fk_image_user_id = ${user_id}
            `

    const setProfilePictureSQL = `
        UPDATE user_image
        SET image_type = 'profile_picture_selected'
        WHERE image_url = '${imgBaseUrl}' AND fk_image_user_id = ${user_id}
    `


    pool.getConnection((err, connection)=>{

        connection.query(deselectProfilePictureSQL,(err, data)=>{
            if(err) throw err;
            
        })

        connection.query(setProfilePictureSQL, (err,data)=>{
            if(err) throw err;
            const responseBody = {
                message: "Profile picture is set successfully."
            }
            res.send(responseBody)
        })

        if (err) throw err;
        connection.release()



    })


    console.log(req.body)
})