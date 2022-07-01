import express from 'express';
import { pool } from '../../server';


export const sendMessage = express.Router()

sendMessage.post('/api/sendMessage', async (req, res)=>{
    
    const {chat_id, user_id, messageText} = req.body

    console.log(req.body)



    const addedMessageResponse = await addMessageToChat()

    console.log(addedMessageResponse)
    const lastMessagesResponse = await getLastMessages()

    res.send(lastMessagesResponse)






    function addMessageToChat(){
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
        return new Promise((resolve, reject)=>{

            pool.query(addMessageToChatSql, (err, data)=>{                
                if(err){
                    throw err;
                }else{
                    resolve({message: "Message sent succesfully!"})
                }
                
            })
        })


    }

        function getLastMessages(){

            const getLastMessagesSql = `
            
            SELECT *
            FROM message
            WHERE fk_message_chat_id = '${chat_id}'
            `

            return new Promise((resolve, reject)=>{


                pool.query(getLastMessagesSql, (err, data)=>{

                    if(err){
                        //reject(err)
                        throw err
                    }
                    resolve(data)
                })
            })
        }


})