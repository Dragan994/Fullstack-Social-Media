import mySql from 'mysql';
import databaseConfig from './Database-config.json'
export default function resetUsersTable(){
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
    connect()
    const createTableSql =
     `CREATE TABLE users(
        user_id INT NOT NULL AUTO_INCREMENT,
        firstname VARCHAR(40) NOT NULL,
        lastname VARCHAR(40) NOT NULL,
        username VARCHAR(40) NOT NULL,
        email VARCHAR(40) NOT NULL,
        password VARCHAR(40) NOT NULL,
        PRIMARY KEY ( user_id )
     );`
    connnection.query(createTableSql, (err, res, fields)=>{
        if(err) {
            if(err.message.includes("Table 'users' already exists")){
                // Drop table
                connnection.query("DROP TABLE users", (err,res,fields)=> {
                    if (err) throw err;
                })
                // Create table
                resetUsersTable()
                console.log("Table users is resetted succesfully!")
                connnection.end()
            }
            else throw err;
        }
    })
}