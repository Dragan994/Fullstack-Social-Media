import express from 'express';
import { pool } from '../../server';



export const getUserProfileRouter = express.Router();


getUserProfileRouter.get("/api/userProfile", (req, res)=>{

    const user_id = req.query.id
    console.log(req)

    const getUserByIdSQL = `
    SELECT
        u.firstname,
        u.lastname,
        u.email,
        i.image_url
    FROM user_profile u
    JOIN user_image i
        ON i.fk_image_user_id = u.user_id AND i.image_type = 'profile_picture_selected'
    WHERE user_id = ${user_id}
    `

    pool.query(getUserByIdSQL, (err,data)=>{
        if(err) throw err;
        res.send(data[0])
    })
})
