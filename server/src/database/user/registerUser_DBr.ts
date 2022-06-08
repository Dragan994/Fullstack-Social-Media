
import mySql from 'mysql';
import { UserInterface } from '../../User-interface';
import databaseConfig from '../Database-config.json'

export default function registerUser(newUserData: UserInterface, callback:any){
    let  connnection! : mySql.Connection

    const {firstname, lastname, username, email, password } = newUserData;



    getUser(username,email, (dbRes)=>{
        const response = dbRes;
        if(response.status === "User not found."){
            connect()
            const newUserSql =
            `INSERT INTO user_profile ( firstname, lastname, username, email, password )
            VALUES ('${firstname}', '${lastname}', '${username}', '${email}', '${password}')`
            connnection.query(newUserSql, (err, res, fields)=>{
                if (err) throw err
                console.log(`User ${firstname} ${lastname} added succesfully.`)
                
                connnection.end()
                return callback({status: "User created succesfully.", data: newUserData})
            })
            console.log(response)
        }
        else{
            if(dbRes['data']['username'] === username){
                return callback({status: "Username taken.", data: null})
            }
            else if(dbRes['data']['email'] === email){
                return callback({status: "Email taken.", data: null})
            }
        }
    });

    function getUser(username: string,email:string, callback:any){
        const response = {
            status: null,
            data: null
        };
        connect();
        const getUserSql =
        `SELECT * FROM user_profile
        WHERE username = '${username}' OR email = '${email}'`
        connnection.query(getUserSql, (err, res, fields)=>{
            if(err)throw err

            let rawuserData = res;
            if(rawuserData.length === 0){
                response.status =  "User not found."
                response.data = null;               
                connnection.end();
                return callback(response)
            }
            else if(rawuserData.length === 1){
                response.status = "User found."  
                response.data = {...rawuserData[0]}
                connnection.end();
                return callback(response)
            }else if(rawuserData.length >= 1){
                const multiUserError = "DATABASE ERROR: Multiple users with same username, this could be a problem!!!"
                console.error("\x1b[31m",multiUserError)
                response.status = multiUserError
                connnection.end();                
                return callback(response)
            }
        })
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