import express from 'express';
import {pool} from '../../server'



export const cancelFriendship = express.Router();

cancelFriendship.post('/api/cancelFriendship', (req,res)=>{

    const {friendship_id} = req.body

    const cancelFriendshipSQL = `
        DELETE FROM user_friendship
        WHERE friendship_id = '${friendship_id}'
    `

    pool.query(cancelFriendshipSQL, (err, data)=>{
        if(err) throw err;


        console.log(data)

        res.send({status: "OK"})
    })



})