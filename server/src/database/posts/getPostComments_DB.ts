import mySql from 'mysql';
import databaseConfig from '../Database-config.json'


export default function getPostComments(post_id, callback){ 
    let  connnection! : mySql.Connection

    
    connect()
    const usersWhoCommentedList = []
    const getPostsCommentsSQL = 
    `SELECT * FROM post_comment
    WHERE fk_comm_post_id = '${post_id}';`

    connnection.query(getPostsCommentsSQL, (err, res, field)=>{
        if(err) throw err;
        const tempList = res
        
        tempList.forEach( item =>{
            usersWhoCommentedList.push(item['fk_comm_user_id'])
        })
       // console.log("DB RES POST COMMENTS")
       // console.log(res)
        //console.log(usersWhoCommentedList)
        getUsersList(res, usersWhoCommentedList)
    })




    function getUsersList(commentList , _usersWhoCommentedList){
        const getUsersWhoCommentedSQL = 
        `SELECT user_id, firstname, lastname FROM user_profile
        WHERE user_id IN (${_usersWhoCommentedList});
        `
        if(_usersWhoCommentedList.length === 0){ // This fixed an error that sql throw when array is empty...
            
            callback([])
            connnection.end()
        }else{
            connnection.query(getUsersWhoCommentedSQL, (err, usersList, field)=>{
                if(err) throw err;
                const data = {
                    commentList,
                    usersList
                }
                
                mergeUserAndPostData(commentList, usersList)
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

    function mergeUserAndPostData(_commentList, _usersList){
        const commentList = _commentList
        const usersList = _usersList
        commentList.forEach(comment=>{
            const user = usersList.find(user=> user['user_id'] ==comment['fk_comm_user_id'])
            comment.userData = {
                user_id: user.user_id,
                firstname:user.firstname,
                lastname: user.lastname
            }
        })
        callback(commentList)



    }




}