import mySql from 'mysql';
import { UserInterface } from '../User-interface';
import databaseConfig from './Database-config.json'


export default class Database {

    private connnection! : mySql.Connection

        
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

    resetUsersTable(){
        this.connect()
        const createTableSql =
         `CREATE TABLE users(
            user_id INT NOT NULL AUTO_INCREMENT,
            firstname VARCHAR(40) NOT NULL,
            lastname VARCHAR(40) NOT NULL,
            username VARCHAR(40) NOT NULL,
            email VARCHAR(40) NOT NULL,
            password VARCHAR(40) NOT NULL,
            token VARCHAR(1000) NOT NULL,
            PRIMARY KEY ( user_id )
         );`
        this.connnection.query(createTableSql, (err, res, fields)=>{
            if(err) {
                if(err.message.includes("Table 'users' already exists")){
                    // Drop table
                    this.connnection.query("DROP TABLE users", (err,res,fields)=> {
                        if (err) throw err;
                    })
                    // Create table
                    this.resetUsersTable()
                    console.log("Table users is resetted succesfully!")
                    this.connnection.end()
                }
                else throw err;
            }
        })
    }


    addNewUser(newUserData: UserInterface, callback:any){
        const {firstname, lastname, username, email, password, token } = newUserData;
        this.getUser(username, (dbRes)=>{
            const response = dbRes;
            if(response.status === "User not found."){
                this.connect()
                const newUserSql =
                `INSERT INTO users ( firstname, lastname, username, email, password, token )
                VALUES ('${firstname}', '${lastname}', '${username}', '${email}', '${password}' ,'${token}')`
                this.connnection.query(newUserSql, (err, res, fields)=>{
                    if (err) throw err
                    console.log(`User ${firstname} ${lastname} added succesfully.`)
                    
                    this.connnection.end()
                    return callback({status: "User created succesfully.", data: newUserData})
                })
                console.log(response)
            }
            else{                
                return callback({status: "Username taken.", data: null})
            }
        });
    }

    getUser(username: string, callback:any){
        const response = {
            status: null,
            data: null
        };
        this.connect();
        const getUserSql =
        `SELECT * FROM users
        WHERE username = '${username}'`
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

    loginUser(username, password, callback){
        this.connect();
        const loginUserSql =
        `SELECT * FROM users
        WHERE username = '${username}' AND password = '${password}'`
        this.connnection.query(loginUserSql, (err,res,fields)=>{
            if(err) throw err;
            return callback(res)
        })

    }

    writeToken(user_id, token){
        const sqlToken = JSON.stringify(token)
        const writeTokenSql =
        `UPDATE users
        SET token = '${sqlToken}'
        WHERE user_id = ${user_id};`
        console.log("WRITING TOKEN TO DB")
        console.log(user_id, sqlToken)
        this.connnection.query(writeTokenSql, (err,res,fields)=>{
            if(err) throw err;
            console.log("Token set succesfully.")
        })


    }

    


}