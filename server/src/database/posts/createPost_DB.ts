import mySql from 'mysql';
import databaseConfig from '../Database-config.json'


export default function createPost(postData){    
    let  connnection! : mySql.Connection

    console.log("Create post DB")
    const {user_id, firstname, lastname, post_text} = postData
    console.log(postData)

    const createPostSQL = 
    `INSERT INTO posts (fk_post_user_id, firstname, lastname, post_text)
    VALUES ((SELECT user_id FROM users WHERE user_id = '${user_id}'), '${firstname}', '${lastname}', '${post_text}')
    `
    connect()

    connnection.query(createPostSQL, (err, res, field)=>{
        console.log("DEbug here")
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