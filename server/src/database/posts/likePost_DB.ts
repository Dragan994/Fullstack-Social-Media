import mySql from 'mysql';
import databaseConfig from '../Database-config.json'
import getPostLikeList from './getPostLikeList_DB';


export default function likePost(likeData, callback){    
    let  connnection! : mySql.Connection

    console.log("Like post DB")
    const {post_id,user_id} = likeData
    console.log(likeData)




    function likePost(){
         //connect()

         const likePostSQL = 
         `INSERT INTO likes (fk_like_post_id, fk_like_user_id)
         VALUES ((SELECT post_id FROM posts WHERE post_id = '${post_id}'), (SELECT user_id FROM users WHERE user_id = '${user_id}'));
         `
         // Add Like
         
         connnection.query(likePostSQL, (err, res, field)=>{
            if(err) throw err;
             connnection.end()
            })
    }
    

    //Remove Like
    function unlikePost(){
        //connect()
        const unlikePostSQL = 
        `DELETE FROM likes
        WHERE fk_like_post_id = '${post_id}' AND fk_like_user_id = '${user_id}';
        `
        connnection.query(unlikePostSQL, (err, res, field)=>{
            if(err) throw err;
            connnection.end()
        })
    }

    
    // Check if like exists
    connect()
    const findLikeSQL = 
    `SELECT * FROM likes
    WHERE fk_like_post_id = '${post_id}' AND fk_like_user_id = '${user_id}';
    `
    connnection.query(findLikeSQL, (err, res, field)=>{
        if(err) throw err;
        
        if(res.length == 0){    // Has no like 
            console.log(`Post: ${post_id} liked by user: ${user_id}`)
            likePost()
            getPostLikeList(post_id,callback)
        }else{                  // Has Like
            console.log(`Post: ${post_id} disliked by user: ${user_id}`)
            unlikePost()
            getPostLikeList(post_id,callback)
        }
        
        //Send posts likes list back
    })
    





    function connect(){
        console.log("Creating connection to Database")
        connnection = mySql.createConnection(databaseConfig)
        connnection.connect( (err)=>{
            if(err) {
                console.error("Error connecting to Database:\nError:" + err.stack);
                return
            }
            console.log("Connected as id:" + connnection.threadId)
        })
    }  
}