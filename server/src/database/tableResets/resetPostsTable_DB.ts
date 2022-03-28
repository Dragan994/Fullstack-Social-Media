import mySql from 'mysql';
import databaseConfig from '../Database-config.json'


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
        fk_post_user_id INT NOT NULL,
        post_img_url TEXT(500),
        post_text TEXT(500) NOT NULL,
        date_of_creation DATETIME,
        PRIMARY KEY (post_id),
        CONSTRAINT fk_post_user_id FOREIGN KEY (fk_post_user_id)
        REFERENCES users(user_id)
            ON DELETE CASCADE
        
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