import express from 'express';
import Database from '../../database/Database';


const database = new Database()


export const likePost = express.Router();
// Like post system works as toggle like as it should... and returns list of likes for post you liked so it will refresh likes after you like/dislike it...

likePost.post('/api/likePost', (req, res)=>{
    const likeData = req.body
    database.likePost(likeData, (resDB)=>{
        console.log("User liked post")
        res.send(resDB)
    })

})