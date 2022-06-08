import express from 'express';
import Database from '../../database/Database';

import { pool } from '../../server';
import UpdateUserDB from '../../database/user/updateUser_DB';

const database = new Database()

export const updateUserRouter = express.Router();


updateUserRouter.post("/api/updateUser", (req, res)=>{
    const updateData = req.body

    const {firstname, lastname, username,password, newPassword} = updateData
    console.log('Update User')
    console.log(updateData)


    const updateUserSQL = 
    `UPDATE user_profile
    SET firstname = '${firstname}', lastname= '${lastname}' , password= '${newPassword}'
    WHERE username = '${username}' AND password= '${password}';
    `


    /*
    database.updateUser(updateData, (resDB)=>{
        res.send({...resDB})
    })
    */
})
