import express from 'express';
import Database from '../../database/Database';
import jwt from 'jsonwebtoken'
import { verifyToken } from '../../utils/verifyToken'; // This middleware should be checked, now it has no function...
export const userRouter = express.Router();


userRouter.use(express.json())

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

