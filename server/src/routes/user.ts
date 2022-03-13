import express from 'express';
import Database from '../database/Database';
import jwt from 'jsonwebtoken'
import { verifyToken } from '../utils/verifyToken';
export const userRouter = express.Router();

const database = new Database()

userRouter.use(express.json())


userRouter.post("/api/login", (req,res)=>{
    // In login we get username and password
    const {username,password} = req.body

    database.getUser(username, (DBresponse)=> {

        if (DBresponse.status === "User found."){
            database.loginUser(username,password, (reqestUserData)=>{
                if(reqestUserData.length === 1){
                    jwt.sign({...reqestUserData[0]}, "secret",(err, token)=>{
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

userRouter.post("/api/register", (req,res)=>{
    const newUserData = req.body    
    database.addNewUser(newUserData,(dbResponse)=>{        
        res.send(dbResponse)
    })
})

userRouter.post("/api/user",verifyToken, (req,res)=>{
    console.log("User route called")
    jwt.verify(req.body["token"], "secret",(err, authData)=>{
        if(err){
            console.log(err)
            res.send({
                status: 403,
                message: "Forbidden",
                data: null
            })
        }else{
            res.send({
                message: "Access granted",
                data: authData
            })
        }
    })
})

