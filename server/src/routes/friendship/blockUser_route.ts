import express from 'express';
import {pool} from '../../server'



export const blockUser = express.Router();

blockUser.post('/api/blockUser', (req,res)=>{

    const {friendship_id, requester_id, addressee_id} = req.body

    if(friendship_id){
        
        const blockUserSQL = `
        UPDATE user_friendship
        SET fk_blocked_by = (SELECT user_id FROM user_profile WHERE user_id = '${requester_id}')
        WHERE friendship_id = '${friendship_id}'
        `
        
        pool.query(blockUserSQL, (err, data)=>{
            if(err) throw err;
            res.send({message: "Block with friendship"})
        })
    }else{

        
        
        const unblockUserWithoutFriendshipSQL = `
        INSERT INTO user_friendship (
            fk_requester_id,
            fk_addressee_id,
            fk_blocked_by,
            date_of_creation,
            status)
        VALUES(
            (SELECT user_id FROM user_profile WHERE user_id = '${requester_id}'),
            (SELECT user_id FROM user_profile WHERE user_id = '${addressee_id}'),
            (SELECT user_id FROM user_profile WHERE user_id = '${requester_id}'),
            now(),
            'blocked')
            `
            
            pool.query(unblockUserWithoutFriendshipSQL, (err, data)=>{
                if(err){
                    console.error(err.message)
                }
                console.log(data)
            })
            res.send({message: "Block without friendship"})
            
        }


})