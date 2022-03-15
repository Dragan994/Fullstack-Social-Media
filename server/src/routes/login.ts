import express from "express";
import Database from '../database/Database';
import jwt from 'jsonwebtoken'

const database = new Database()

export const loginRouter = express.Router();

loginRouter.post("/api/login", (req,res)=>{
    // In login we get username and password
    const {username,password} = req.body

    database.getUser(username, (DBresponse)=> {

        if (DBresponse.status === "User found."){
            database.loginUser(username,password, (reqestUserData)=>{
                if(reqestUserData.length === 1){
                    jwt.sign({...reqestUserData[0]}, "secret",(err, token)=>{
                        if(err) throw err;
                        
                        const userData = {...reqestUserData}
                        userData['token'] = token;
                            res.json({
                            token: token,
                            data: userData,
                            status: "Login succesfull"
                        })
                        //database.writeToken(reqestUserData[0]['user_id'],token)
                    })
                }else{
                    res.send({
                        data:null,
                        status: "Wrong password"
                    })
                }
            })
        }
        else{
            res.send({
                data:null,
                status: "Wrong credentials"
            })
            console.log("Login failed...")
        }
        
    })
})