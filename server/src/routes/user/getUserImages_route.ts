import express from 'express';
import { pool } from '../../server';



export const getUserImages = express.Router();


getUserImages.post('/api/getUserImages', (req, res)=>{

    const user_id = req.body['user_id']

    const getUserImagesSQL = `
    SELECT *
    FROM user_image
    WHERE fk_image_user_id = ${user_id}
    `

    pool.query(getUserImagesSQL, (err,data)=>{
        if(err) throw err;
        res.send(data)
    })


})