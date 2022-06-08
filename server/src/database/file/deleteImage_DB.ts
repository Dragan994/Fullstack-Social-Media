import mySql from 'mysql';
import databaseConfig from '../Database-config.json'


export default function deleteImage(postData){    
    let  connnection! : mySql.Connection

    console.log("Delete image DB")
    const {user_id, image_url} = postData
    console.log(postData)

    const deleteImageSQL = 
    `DELETE FROM user_image 
    WHERE fk_image_user_id = '${user_id}' AND image_url = '${image_url}'
    `
    connect()

    connnection.query(deleteImageSQL, (err, res, field)=>{
        console.log(err)
        console.log(res)
        connnection.end()
        console.log(`Image ${image_url} deleted succesfully.`)
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