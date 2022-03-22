import mySql from 'mysql';
import { UserInterface } from '../User-interface';
import addNewUser from './user/registerUser_DBr';
import databaseConfig from './Database-config.json'
import loginUser from './user/loginUser_DB';
import resetPostsTable from './tableResets/resetPostsTable_DB';
import resetUsersTable from './tableResets/resetUsersTable_DB';
import updateUserDB from './user/updateUser_DB';
import createPost from './posts/createPost_DB';
import getAllPosts from './posts/getAllPosts_DB';
import resetLikesTable from './tableResets/resetLikesTable_DB';
import resetCommentsTable from './tableResets/resetCommentsTable_DB';
import likePost from './posts/likePost_DB';
import getPostLikeList from './posts/getPostLikeList_DB';
import deletePost from './posts/deletePost_DB';
import commentPost from './posts/commentPost_DB';
import getPostComments from './posts/getPostComments_DB';


export default class Database {


    private  connnection! : mySql.Connection


    addNewUser(newUserData: UserInterface, callback:any){
        addNewUser(newUserData, callback)
    }

    loginUser(username, password, callback){
        loginUser(username, password, callback)
    }

    getUser(username: string,email:string, callback:any){
        const response = {
            status: null,
            data: null
        };
        this.connect();
        const getUserSql =
        `SELECT * FROM users
        WHERE username = '${username}' OR email = '${email}'`
        this.connnection.query(getUserSql, (err, res, fields)=>{
            if(err)throw err

            let rawuserData = res;
            if(rawuserData.length === 0){
                response.status =  "User not found."
                response.data = null;               
                this.connnection.end();
                return callback(response)
            }
            else if(rawuserData.length === 1){
                response.status = "User found."  
                response.data = {...rawuserData[0]}
                this.connnection.end();
                return callback(response)
            }else if(rawuserData.length >= 1){
                const multiUserError = "DATABASE ERROR: Multiple users with same username, this could be a problem!!!"
                console.error("\x1b[31m",multiUserError)
                response.status = multiUserError
                this.connnection.end();                
                return callback(response)
            }
        })
    }


    updateUser(updateData, callback){
        updateUserDB(updateData, callback)
    }

    resetUsersTable(){
        resetUsersTable()
    }

    resetPostsTable(){
        resetPostsTable()
    }
    resetLikesTable(){
        resetLikesTable()
    }
    resetCommentsTable(){
        resetCommentsTable()
    }

    createPost(postData){
        createPost(postData)
    }
    deletePost(postData){
        deletePost(postData)
    }
    getAllPosts(callback){
        getAllPosts(callback)
    }
    likePost(likeData, callback){
        likePost(likeData, callback)
    }
    getPostLikeList(post_id, callback){
        getPostLikeList(post_id, callback)
    }
    commentPost(commentData){
        commentPost(commentData)
    }
    getPostComments(post_id, callback){
        getPostComments(post_id, callback)
    }

    connect(){
        console.log("Creating connection to Database")
        this.connnection = mySql.createConnection(databaseConfig)
        this.connnection.connect( (err)=>{
            if(err) {
                console.error("Error connecting to Database:\nError:" + err.stack);
                return
            }
            console.log("Connected as id:" + this.connnection.threadId)
        })
    }
}