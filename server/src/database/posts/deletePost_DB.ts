import mySql from 'mysql';
import databaseConfig from '../Database-config.json'


export default function deletePost(postData){    
    let  connnection! : mySql.Connection

    console.log("Delete post DB")
    const {post_id} = postData
    console.log(postData)

    const deletePostSQL = `DELETE FROM user_post WHERE post_id = '${post_id}'`
    connect()

    connnection.query(deletePostSQL, (err, res, field)=>{
        if(err) throw err;

        console.log(`Post: ${post_id} deleted`)
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