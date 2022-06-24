import express from 'express';
import {pool} from '../../server'



export const getFriendshipStatus = express.Router();


getFriendshipStatus.post('/api/getFriendshipStatus', (req, res)=>{

    const {user_id, visitedProfileUser_id} = req.body
    console.log('getFriendshipStatus')
    console.log(user_id, visitedProfileUser_id)


    const getFriendshipStatusSQL = `
    SELECT * 
    FROM user_friendship
    WHERE (fk_requester_id = '${user_id}' OR fk_addressee_id = '${user_id}') 
        AND (fk_requester_id = '${visitedProfileUser_id}' OR fk_addressee_id = '${visitedProfileUser_id}')
    `

    pool.query(getFriendshipStatusSQL, (err,data)=>{
        if(err) throw err;


        console.log(data)
        res.send(data[0])
    })
    


  
    
})