import express from 'express';
import Database from '../../database/Database';


const database = new Database()


export const deletePost = express.Router();


deletePost.post('/api/deletePost', (req, res)=>{
    const postData = req.body
    database.deletePost(postData)
})