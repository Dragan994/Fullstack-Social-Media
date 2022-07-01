import express from 'express';
import {pool} from '../../server'


export const getAllPosts = express.Router();



getAllPosts.get('/api/getAllPosts', (req, res)=>{   

    const getAllPostsSQL = `
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
        ON p.fk_post_user_id = u.user_id
    ORDER BY p.date_of_creation DESC
    LIMIT  20
    `


    pool.query(getAllPostsSQL,(err, data) => {
        if(err) {
            console.error(err);
            return;
        }
        res.send(data)
    });

    
})