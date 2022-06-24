import express from "express";
import Database from '../../database/Database';

import { pool } from '../../server';
const database = new Database()

export const registerRouter = express.Router();


registerRouter.post("/api/register", (req,response)=>{

    const {firstname, lastname, username, email, password } = req.body;
    
    pool.getConnection((err, connection)=>{
        if(err) throw err;

        const getUserSql =
        `SELECT * FROM user_profile
        WHERE username = '${username}' OR email = '${email}'`
        connection.query(getUserSql, (err, data)=>{
            if(err){
                connection.release();
                throw err;
            }

            let rawuserData = data;


            // NO USER FOUND WITH SAME USERNAME OR EMAIL > NEW USER IS CREATED
            if(rawuserData.length === 0){
                const newUserSql =
                `INSERT INTO user_profile ( firstname, lastname, username, email, password )
                VALUES ('${firstname}', '${lastname}', '${username}', '${email}', '${password}')`

                

                connection.query(newUserSql, (err, newUserResponse, fields)=>{
                    if (err) throw err
                    console.log(`User ${firstname} ${lastname} added succesfully.`)
                
                    connection.release()
                    response.send({status: "User created succesfully.", data: rawuserData})
                })
            }// END

            // USER IS FOUND WITH SAME USERNAME OR EMAIL, SO IT CAN BE CREATED > SENDING RESPONSE WHAT IS TAKEN
            else if(rawuserData.length === 1){
                
                connection.release();
                if(rawuserData[0]['email'] === email){
                    response.send({status: "Email taken.", data: null})
                }
                else if(rawuserData[0]['username'] === username){
                    response.send({status: "Username taken.", data: null})
                }
            }// END

            // MUPLIPLE USER UNDER SAME NAME OR EMAIL > THIS IS FATAL ERROR AND SHOULD NOT HAPPEN
            else if(rawuserData.length >= 1){
                const multiUserError = "DATABASE ERROR: Multiple users with same username!"
                console.error("\x1b[31m",multiUserError)
                connection.release();
                response.send({status: multiUserError})
            }
        })





    })

/*
    database.addNewUser(newUserData,(dbResponse)=>{        
        res.send(dbResponse)
    })
    */
})




