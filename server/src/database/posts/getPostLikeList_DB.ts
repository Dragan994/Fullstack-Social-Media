import mySql from 'mysql';
import databaseConfig from '../Database-config.json'


export default function getPostLikeList(post_id, callback){ 
    let  connnection! : mySql.Connection

    
    connect()
    const userswhoLikedList = []
    const getPostsLikesSQL = 
    `SELECT * FROM post_like
    WHERE fk_post_like_post_id = '${post_id}';`

    connnection.query(getPostsLikesSQL, (err, res, field)=>{
        if(err) throw err;
        const tempList = res
        
        tempList.forEach( item =>{
            userswhoLikedList.push(item['fk_post_like_user_id'])
        })
        getUsersList()
    })

    function getUsersList(){
        const getUsersWhoLikedSQL = 
        `SELECT user_id, firstname, lastname FROM user_profile
        WHERE user_id IN (${userswhoLikedList});
        `
        if(userswhoLikedList.length === 0){ // This fixed an error that sql throw when array is empty...
            
            callback([])
            connnection.end()
        }else{
            connnection.query(getUsersWhoLikedSQL, (err, res, field)=>{
                if(err) throw err;
                callback(res)
                connnection.end()
            })
        }
    }



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