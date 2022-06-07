import express from 'express';
import Database from '../../database/Database';
import { pool } from '../../server';


const database = new Database()


export const deletePost = express.Router();


deletePost.post('/api/deletePost', (req, res)=>{
    console.log('deletePost')
    const postData = req.body
    const {post_id} = postData

    const deletePostSQL = `DELETE FROM user_post WHERE post_id = '${post_id}'`

    pool.query(deletePostSQL,(err, data)=>{
        if(err) throw err;
        res.send(data)
    })



    //database.deletePost(postData)
})