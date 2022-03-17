import express from 'express';
import Database from '../database/Database';

import UpdateUserDB from '../database/updateUserDB'
const updateUserDB = new UpdateUserDB()

export const updateUserRouter = express.Router();


updateUserRouter.post("/api/updateUser", (req, res)=>{
    const updateData = req.body
    console.log('Update User')

    updateUserDB.update(updateData, (resDB)=>{
        res.send({...resDB})
    })
})
