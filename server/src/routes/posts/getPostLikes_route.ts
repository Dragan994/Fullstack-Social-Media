import express from 'express';
import Database from '../../database/Database';
import { pool } from '../../server';


const database = new Database()


export const getPostLikeList = express.Router();
// Like post system works as toggle like as it should... and returns list of likes for post you liked so it will refresh likes after you like/dislike it...

getPostLikeList.post('/api/getPostLikeList', (req, res)=>{
    const post_id = req.body['post_id']


    const getPostLikesSQL = `
    SELECT
        user_id,
        firstname,
        lastname
    FROM user_profile 
    WHERE user_id IN (
    SELECT fk_post_like_user_id 
    FROM sql_social_media.post_like
    WHERE fk_post_like_post_id = ${post_id}
    )
    `

    pool.query(getPostLikesSQL, (err, data)=>{
        if(err) throw err;
        res.send(data)
    })



    //database.getPostLikeList(post_id, (resDB)=>{res.send(resDB)})

})