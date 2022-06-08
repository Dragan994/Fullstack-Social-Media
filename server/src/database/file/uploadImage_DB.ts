import mySql from 'mysql';
import databaseConfig from '../Database-config.json'


export default function uploadImage(imageData){    
    let  connnection! : mySql.Connection

    console.log("Create image DB")
    const {user_id, image_url, image_type, image_description} = imageData
    console.log(imageData)

    const uploadImageSQL = 
    `INSERT INTO user_image (
        fk_image_user_id,
        image_url,
        image_type,
        image_description,
        date_of_creation
    )
    VALUES (
        (SELECT user_id FROM user_profile WHERE user_id = '${user_id}'),
        '${image_url}',
        '${image_type}',
        '${image_description}',
        now()
    );
    `
    connect()

    connnection.query(uploadImageSQL, (err, res, field)=>{
        console.log(err)
        connnection.end()
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