import express from 'express';
import Database from '../../database/Database';


const database = new Database()


export const getPostsComments = express.Router();


getPostsComments.post('/api/getPostComments', (req, res)=>{
    console.log("getPostsComments")
    const post_id = req.body['post_id']
    console.log(req.body)
    database.getPostComments(post_id, (resDB)=>{
        res.send(resDB)
    })

})