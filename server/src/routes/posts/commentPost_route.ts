import express from 'express';
import Database from '../../database/Database';


const database = new Database()


export const commentPost = express.Router();


commentPost.post('/api/commentPost', (req, res)=>{
    const commentData = req.body
    database.commentPost(commentData, (resDB)=>{
        // Sending back comments to post
        res.send(resDB)

    })
})