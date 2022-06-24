import express from 'express';
import Database from '../../database/Database';

import { pool } from '../../server';
import UpdateUserDB from '../../database/user/updateUser_DB';

const database = new Database()

export const updateUserRouter = express.Router();


updateUserRouter.post("/api/updateUser", (req, res)=>{
    const mainData = req.body
    console.log(mainData)
    const {user_id, updateFormData} = mainData

    const {firstname, lastname, newPassword, changePassword} = updateFormData
    console.log('Update User')
    console.log(user_id)
    console.log(updateFormData)


    if(changePassword){
        const updateUserSQL = 
        `UPDATE user_profile
        SET firstname = '${firstname}', lastname= '${lastname}', password = '${newPassword}'
        WHERE user_id = '${user_id}';
        `
        pool.query(updateUserSQL, (err,data)=>{
            if(err) throw err;
            
            console.log(data)
            const responseBody = {
                status: "OK",
                message:"User updated succesfully with password"
            }
            res.send(responseBody)
        })
        
    }else{
        
        const updateUserSQL = 
        `UPDATE user_profile
        SET firstname = '${firstname}', lastname= '${lastname}'
        WHERE user_id = '${user_id}';
        `
        pool.query(updateUserSQL, (err,data)=>{
            if(err) throw err;
            
            console.log(data)
            const responseBody = {
                status: "OK",
                message:"User updated succesfully without password"
            }
            res.send(responseBody)
        })
    }



    /*
    database.updateUser(updateData, (resDB)=>{
        res.send({...resDB})
    })
    */
})
