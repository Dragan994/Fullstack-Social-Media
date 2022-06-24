import express from 'express';
import {pool} from '../../server'



export const sendFriendRequest = express.Router();


sendFriendRequest.post('/api/sendFriendRequest', (req, res)=>{

    const {requester_id, adressee_id} = req.body
  console.log(requester_id, adressee_id)

  const sendFriendRequestSQL = `
  INSERT INTO user_friendship(
      fk_requester_id,
      fk_addressee_id,
      status,
      date_of_creation
  )
  VALUES(
    (SELECT user_id FROM user_profile WHERE user_id = '${requester_id}'),    
    (SELECT user_id FROM user_profile WHERE user_id = '${adressee_id}'),
    'pending',
    now()
  )
  `

  pool.query(sendFriendRequestSQL, (error,data)=>{
    if(error){
        res.send({error})
        return
    }
      
      res.send({status: "OK"})
  })
   
})