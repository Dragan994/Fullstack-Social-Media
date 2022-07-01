import express from 'express';
import { pool } from '../../server';

export const getChatMessageList = express.Router()

getChatMessageList.post("/api/getChatMessageList", (req, res)=>{

    const {chat_id} = req.body

    const getChatMessageListSql = `
    
    SELECT *
    FROM message
    WHERE fk_message_chat_id = '${chat_id}'
    `

    pool.query(getChatMessageListSql, (err, data)=>{

        if(err){
            throw err
        }
        res.send(data)
    })






})