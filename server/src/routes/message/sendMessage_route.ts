import express from 'express';
import { pool } from '../../server';


export const sendMessage = express.Router()

sendMessage.post('/api/sendMessage', (req, res)=>{
    
    const {chat_id, user_id, messageText} = req.body

    console.log(req.body)

    const addMessageToChatSql = `
    INSERT
    INTO message(
        fk_message_chat_id,
        fk_message_user_id,
        message_text,
        date_of_creation
    )
    VALUES(
        (SELECT chat_id FROM chat WHERE chat_id = '${chat_id}'),
        (SELECT user_id FROM user_profile WHERE user_id = '${user_id}'),
        '${messageText}',
        now()
    )
    `

    pool.query(addMessageToChatSql, (err, data)=>{

        if(err){
            throw err;
        }

        if(!err){
            res.send({message: "Message sent succesfully!"})
        }


    })

})