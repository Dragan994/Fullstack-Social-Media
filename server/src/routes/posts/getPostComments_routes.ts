import express from 'express';
import Database from '../../database/Database';
import { pool } from '../../server';


const database = new Database()


export const getPostsComments = express.Router();


getPostsComments.post('/api/getPostComments', (req, res)=>{
    console.log("getPostsComments")
    const post_id = req.body['post_id']
    console.log(req.body)


    

    const getPostCommentListSQL = `
    SELECT 
        c.comment_id,
        c.comment_media_url,
        c.comment_text,
        c.date_of_creation,
        u.firstname,
        u.lastname,
        u.user_id
    FROM post_comment c
    JOIN user_profile u
        ON c.fk_comm_user_id = u.user_id
    WHERE c.fk_comm_post_id = ${post_id}
    ORDER BY c.date_of_creation DESC
    `



    

    pool.query(getPostCommentListSQL,(err, data) => {
        if(err){
            console.log(err)
        }
        res.send(data)
    })

/*
    database.getPostComments(post_id, (resDB)=>{
        res.send(resDB)
    })
*/
})