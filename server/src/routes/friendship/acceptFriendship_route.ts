import express from 'express';
import {pool} from '../../server'



export const acceptFriendship = express.Router();


acceptFriendship.post("/api/acceptFriendship", (req,res)=>{
    
    const {friendship_id} = req.body
    
    console.log(friendship_id)

    const acceptFriendshipSQL = `
    UPDATE user_friendship
    SET status = 'accepted'
    WHERE friendship_id = '${friendship_id}'
    `

    pool.query(acceptFriendshipSQL, (error,data)=>{
        if(error){
            res.send({error})
            return
        }
        res.send({status: "OK"})
    })



})