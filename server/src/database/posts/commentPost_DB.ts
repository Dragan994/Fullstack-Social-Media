import mySql from 'mysql';
import databaseConfig from '../Database-config.json'
import getPostComments from './getPostComments_DB';


export default function commentPost(commentData, callback){    
    let  connnection! : mySql.Connection

    console.log("Create post DB")
    const {post_id, user_id, comment_img_url, comment_text} = commentData    
    console.log(commentData)

    const commentPostSQL = 
    `INSERT INTO post_comment (fk_comm_post_id, fk_comm_user_id , comment_media_url, comment_text, date_of_creation)
    VALUES ((SELECT post_id FROM user_post WHERE post_id = '${post_id}'),
    (SELECT user_id FROM user_profile WHERE user_id = '${user_id}'),'${comment_img_url}', '${comment_text}', curdate());
    `
    connect()

    connnection.query(commentPostSQL, (err, res, field)=>{
        console.log("Posting Comment")
        console.log(err)
        if(!err){

            getPostComments(post_id, (res)=>{
                callback(res)
            })
        }
        connnection.end()
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