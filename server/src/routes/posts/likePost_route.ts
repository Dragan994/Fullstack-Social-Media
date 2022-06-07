import express from 'express';
import {pool} from '../../server';




export const likePost = express.Router();
// Like post system works as toggle like as it should... and returns list of likes for post you liked so it will refresh likes after you like/dislike it...

likePost.post('/api/likePost', (req, res)=>{
    const likeData = req.body
    const {post_id, user_id} = likeData

    console.log('/api/likePost')
    console.log(likeData)

    const findLikeSQL = `
    SELECT post_like_id
    FROM post_like
    WHERE fk_post_like_post_id = '${post_id}' AND fk_post_like_user_id = '${user_id}'
    `;

    const likePostSQL = `
    INSERT INTO post_like (
        fk_post_like_post_id,
        fk_post_like_user_id
    )
    VALUES (
        (SELECT post_id FROM user_post WHERE post_id = '${post_id}'),
        (SELECT user_id FROM user_profile WHERE user_id = '${user_id}')
    )
    `;
    
    const dislikePostSQL = `
    DELETE FROM post_like
    WHERE fk_post_like_post_id = '${post_id}' AND fk_post_like_user_id = '${user_id}'
    `;

    const getPostLikeListSQL = `
    SELECT
        user_id,
        firstname,
        lastname
    FROM user_profile
    WHERE user_id IN (
        SELECT fk_post_like_user_id 
        FROM sql_social_media.post_like
        WHERE fk_post_like_post_id = '${post_id}'
    )
    `

    pool.getConnection((err, connection)=>{
        if (err) throw err;

        connection.query(findLikeSQL,(err, data)=>{
            console.log(data);
            if(data[0] === undefined){
                console.log('post in not liked');
                likePost();
                getLikeList()
            }else{
                console.log("post is liked")
                dislikePost();
                getLikeList()
            }
            
            if(err) throw err;
        })
        
        function likePost(){
            connection.query(likePostSQL, (err, data) => { if(err) throw err })
        }
        
        function dislikePost(){
            connection.query(dislikePostSQL, (err, data) => { if(err) throw err })
        }
        function getLikeList(){
            connection.query(getPostLikeListSQL, (err,data)=>{
                res.send(data)
                connection.release();
                if(err) throw err;
            });
        }
    });
})