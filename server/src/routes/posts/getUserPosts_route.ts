import express from 'express';
import {pool} from '../../server'


export const getUserPosts = express.Router();



getUserPosts.post('/api/getUserPosts', (req, res)=>{  
    console.log("getUserPosts")
    console.log(req.body['user_id']) 

    const user_id = req.body['user_id']

    const getUserPostsSQL = `
    SELECT 
        p.post_id,
        p.post_media_url,
        p.post_text,
        p.date_of_creation,
        u.user_id,
        u.firstname,
        u.lastname
    FROM user_post p
        JOIN user_profile u       
        ON p.fk_post_user_id = u.user_id AND u.user_id = ${user_id}
    ORDER BY p.date_of_creation DESC
    `


    pool.query(getUserPostsSQL,(err, data) => {
        if(err) {
            console.error(err);
            return;
        }
        res.send(data)
    });

    
})