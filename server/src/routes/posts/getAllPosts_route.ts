import express from 'express';
import Database from '../../database/Database';


const database = new Database()


export const getAllPosts = express.Router();


getAllPosts.get('/api/getAllPosts', (req, res)=>{
    console.log("Getting all posts")
    database.getAllPosts(posts =>{
        console.log(posts)
        res.send(posts)
    })
})