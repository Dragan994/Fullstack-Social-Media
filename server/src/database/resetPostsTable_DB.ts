import mySql from 'mysql';
import databaseConfig from './Database-config.json'


export default function resetPostsTable(){
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
     `CREATE TABLE posts(
        post_id INT NOT NULL AUTO_INCREMENT,
        user_id INT,
        post_Text TEXT(500) NOT NULL,
        PRIMARY KEY (post_id),
        CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES users(user_id)
    );
    `
    connnection.query(createTableSql, (err, res, fields)=>{
        if(err) {
            if(err.message.includes("Table 'posts' already exists")){
                // Drop table
                connnection.query("DROP TABLE posts", (err,res,fields)=> {
                    if (err) throw err;
                })
                // Create table
                resetPostsTable()
                console.log("Table posts is resetted succesfully!")
                connnection.end()
            }
            else throw err;
        }
    })
}