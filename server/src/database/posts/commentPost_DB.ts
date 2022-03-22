import mySql from 'mysql';
import databaseConfig from '../Database-config.json'


export default function commentPost(commentData){    
    let  connnection! : mySql.Connection

    console.log("Create post DB")
    const {post_id,user_id, comment_text} = commentData
    console.log(commentData)

    const commentPostSQL = 
    `INSERT INTO comments (fk_comm_post_id, fk_comm_user_id , comment_text)
    VALUES ((SELECT post_id FROM posts WHERE post_id = '${post_id}'),(SELECT user_id FROM users WHERE user_id = '${user_id}'), '${comment_text}')
    `
    connect()

    connnection.query(commentPostSQL, (err, res, field)=>{
        console.log("Posting Comment")
        console.log(err)
        console.log(res)
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