import express from 'express';
import Database from '../database/Database';

import UpdateUserDB from '../database/updateUser_DB';

const database = new Database()

export const updateUserRouter = express.Router();


updateUserRouter.post("/api/updateUser", (req, res)=>{
    const updateData = req.body
    console.log('Update User')

    database.updateUser(updateData, (resDB)=>{
        res.send({...resDB})
    })
})
