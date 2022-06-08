import mySql from 'mysql';
import databaseConfig from '../Database-config.json'


export default function getUserByID(user_id, callback){
    let  connnection! : mySql.Connection


    
    connect();

    const getUserByIDSql =
    `SELECT firstname, lastname, email 
     FROM user_profile
     WHERE user_id = '${user_id}'`
    console.log(user_id)
    connnection.query(getUserByIDSql, (err,res,fields)=>{
        
        if(err) throw err;

        console.log(res)
        connnection.end()
        return callback(res)
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