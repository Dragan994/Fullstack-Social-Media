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
    const usersWhoPostedList = []
    const allPostsSQL = 
    `SELECT * FROM user_post`

    connnection.query(allPostsSQL, (err, res, fields)=>{
        
        if(err) throw err;
        const tempList = res
        
        tempList.forEach( item =>{
            usersWhoPostedList.push(item['fk_post_user_id'])
        })
        getUsersList(res, usersWhoPostedList)
    })







    function getUsersList(postList , _usersWhoPostedList){
        const getUsersWhoPostedSQL = 
        `SELECT user_id, firstname, lastname FROM user_profile
        WHERE user_id IN (${_usersWhoPostedList});
        `
        if(_usersWhoPostedList.length === 0){ 
            
            callback([])
            connnection.end()
        }else{
            connnection.query(getUsersWhoPostedSQL, (err, usersList, field)=>{
                if(err) throw err;
                const data = {
                    postList,
                    usersList
                }
                
                mergeUserAndPostData(postList, usersList)
                connnection.end()
            })
        }
    }




    function mergeUserAndPostData(_postList, _usersList){
        const postList = _postList
        const usersList = _usersList
        postList.forEach(post=>{
            const user = usersList.find(user=> user['user_id'] ==post['fk_post_user_id'])
            post.userData = {
                user_id: user.user_id,
                firstname:user.firstname,
                lastname: user.lastname
            }
        })
        callback(postList)



    }


}