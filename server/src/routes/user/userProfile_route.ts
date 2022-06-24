import express from 'express';
import { pool } from '../../server';



export const getUserProfileRouter = express.Router();


getUserProfileRouter.get("/api/userProfile", (req, res)=>{

    const user_id = req.query.id

    const getUserByIdSQL = `
    SELECT
        user_id,
        firstname,
        lastname,
        email
    FROM user_profile 
    WHERE user_id = ${user_id}
    `

    pool.query(getUserByIdSQL, (err,data)=>{
        if(err) throw err;
        res.send(data[0])
    })
})
