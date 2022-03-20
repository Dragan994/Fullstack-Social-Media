import express from 'express';
import Database from '../../database/Database';


const database = new Database()


export const createPost = express.Router();


createPost.post('/api/createPost', (req, res)=>{
    const postData = req.body
    database.createPost(postData)
})