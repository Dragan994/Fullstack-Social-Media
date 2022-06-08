import mySql from 'mysql';
import databaseConfig from '../Database-config.json'


export default function loginUser(username, password, callback){
    let  connnection! : mySql.Connection


    function connect(){
        console.log("Creating connection to Database")
        connnection = mySql.createConnection(databaseConfig)
        connnection.connect( (err)=>{
            if(err) {
                console.error("Error connecting to Database:\nError:" + err.stack);
                return
            }
            console.log("Connected as id: @loginUser" + connnection.threadId)
        })
    }   

    connect();

    const loginUserSql =
    `SELECT * FROM user_profile
    WHERE username = '${username}' AND password = '${password}'`
    
    connnection.query(loginUserSql, (err,res,fields)=>{
        if(err) throw err;
        return callback(res)
    })

    




}