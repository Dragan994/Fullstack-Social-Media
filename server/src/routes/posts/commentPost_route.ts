import express from 'express';
import Database from '../../database/Database';
import { pool } from '../../server';


const database = new Database()


export const commentPost = express.Router();


commentPost.post('/api/commentPost', (req, res)=>{
    const commentData = req.body
    console.log(commentData)
    const {post_id, user_id, comment_media_url, comment_text} = commentData
    
    

    const commentPostSQL =`
    INSERT INTO post_comment (
        fk_comm_post_id,
        fk_comm_user_id,
        comment_media_url,
        comment_text,
        date_of_creation
    )
    VALUES (
        (SELECT post_id FROM user_post WHERE post_id = '${post_id}'),
        (SELECT user_id FROM user_profile WHERE user_id = '${user_id}'),
        '${comment_media_url}',
        '${comment_text}',
        now());
    `


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


    pool.getConnection((err, connection)=>{

        
        connection.query(commentPostSQL, (err, data)=>{
            if (err) throw err;
            console.log(`Comment added succesfully to post: ${post_id} from user: ${user_id}.`)
        })
        
        connection.query(getPostCommentListSQL,(err, data)=>{
            res.send(data)            
            
            if(err) throw err;
        })
        connection.release()
    })

/*
    database.commentPost(commentData, (resDB)=>{
        // Sending back comments to post
        res.send(resDB)
    })
    */
})