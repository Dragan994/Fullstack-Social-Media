import express from 'express';
import Database from '../../database/Database';
import {pool} from '../../server'

const database = new Database()


export const createPost = express.Router();


createPost.post('/api/createPost', (req, res)=>{
    const postData = req.body
    const {user_id, post_img_url, post_text} = postData

    const createPostSQL = 
    `INSERT INTO user_post (
        fk_post_user_id,
        post_media_url,
        post_text,
        date_of_creation
    )
    VALUES (
        (SELECT user_id FROM user_profile WHERE user_id = '${user_id}'),
        '${post_img_url}',
        '${post_text}',
        now()
    )
    `

    pool.query(createPostSQL,(err, data) => {
        console.log('creating post')
        if(err) {
            console.error(err);
            return;
        }
        console.log(data)
        res.send({message: 'Post created succesfully.'})
    });





    //database.createPost(postData)
})