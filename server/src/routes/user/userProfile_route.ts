import express from 'express';
import Database from '../../database/Database';


const database = new Database()

export const getUserProfileRouter = express.Router();


getUserProfileRouter.get("/api/userProfile", (req, res)=>{

    const user_id = req.query.id
    database.getUserByID(user_id, (resDB)=>{
        res.send(resDB[0])
    })

})
