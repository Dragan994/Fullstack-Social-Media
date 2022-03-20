import mySql from 'mysql';
import databaseConfig from '../Database-config.json'


export default function resetCommentsTable(){
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
    `CREATE TABLE comments(
       comment_id INT NOT NULL AUTO_INCREMENT,
       fk_comm_post_id INT,
       fk_comm_user_id INT,
       comment_text VARCHAR(500),
       PRIMARY KEY (comment_id),
       CONSTRAINT fk_comm_post_id FOREIGN KEY (fk_comm_post_id)
       REFERENCES posts(post_id),       
       CONSTRAINT fk_comm_user_id FOREIGN KEY (fk_comm_user_id)
       REFERENCES users(user_id)
   );
   `
    connnection.query(createTableSql, (err, res, fields)=>{
        if(err) {
            if(err.message.includes("Table 'comments' already exists")){
                // Drop table
                connnection.query("DROP TABLE comments", (err,res,fields)=> {
                    if (err) throw err;
                })
                // Create table
                resetCommentsTable()
                console.log("Table comments is resetted succesfully!")
                connnection.end()
            }
            else throw err;
        }
    })
}