import express from "express";
import Database from '../../database/Database';

const database = new Database()

export const registerRouter = express.Router();


registerRouter.post("/api/register", (req,res)=>{
    const newUserData = req.body    
    database.addNewUser(newUserData,(dbResponse)=>{        
        res.send(dbResponse)
    })
})