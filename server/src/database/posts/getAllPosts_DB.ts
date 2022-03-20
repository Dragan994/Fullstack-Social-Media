import mySql from 'mysql';
import databaseConfig from '../Database-config.json'

export default function getAllPosts(callback){
    let  connnection! : mySql.Connection


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

    connect();

    const allPostsSQL = 
    `SELECT * FROM posts`

    connnection.query(allPostsSQL, (err, res, fields)=>{
        console.log(res)
        return callback(res)
    })


}