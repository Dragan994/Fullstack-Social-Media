import express from 'express';
import { InferencePriority } from 'typescript';
import { pool } from '../../server';


export const getChatId = express.Router()

getChatId.post('/api/getChatId', async (req, res)=>{
    
    const {user_id, chat_participant_id} = req.body

    
    const chatData = await getChatId();

    if(chatData){
        res.send(chatData)
    }
    else{
        await createChat()
        const new_ChatData = await getChatId()
        res.send(new_ChatData)
    }

    function getChatId(){
        
        const getChatIdSql = `
        SELECT chat_id
        FROM chat
        WHERE (fk_participant1_id = '${user_id}' AND fk_participant2_id = '${chat_participant_id}')
        OR (fk_participant2_id = '${user_id}' AND fk_participant1_id = '${chat_participant_id}')
        `
        return new Promise((resolve, reject)=>{

            pool.query(getChatIdSql, (err, data)=>{
                if(err){
                    //reject(err)
                    throw err
                }

                resolve(data[0])
            })            
        })
    }






    
    
    function createChat(){
       
        const createChatSql = `        
        INSERT INTO chat(
            fk_participant1_id,
            fk_participant2_id
        )
        VALUES(
            '${user_id}',
            '${chat_participant_id}'
        )
        `
    
        return new Promise((resolve, reject)=>{

            pool.query(createChatSql, (err, data)=>{
                if(err){
                    //reject(err)
                    throw err
                }
                resolve(data)
            })           
        })

    }


})