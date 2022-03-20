import express from 'express';
import Database from '../../database/Database';


const database = new Database()


export const getPostLikeList = express.Router();
// Like post system works as toggle like as it should... and returns list of likes for post you liked so it will refresh likes after you like/dislike it...

getPostLikeList.post('/api/getPostLikeList', (req, res)=>{
    const post_id = req.body['post_id']

    database.getPostLikeList(post_id, (resDB)=>{
        res.send(resDB)
    })

})