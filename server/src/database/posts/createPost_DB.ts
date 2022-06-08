import mySql from 'mysql';
import databaseConfig from '../Database-config.json'


export default function createPost(postData){    
    let  connnection! : mySql.Connection

    console.log("Create post DB")
    const {user_id, post_img_url,  post_text} = postData
    console.log(postData)

    const createPostSQL = 
    `INSERT INTO user_post (fk_post_user_id,post_media_url, post_text, date_of_creation)
    VALUES ((SELECT user_id FROM user_profile WHERE user_id = '${user_id}'),'${post_img_url}' , '${post_text}', now())
    `
    connect()

    connnection.query(createPostSQL, (err, res, field)=>{
        console.log(err)
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