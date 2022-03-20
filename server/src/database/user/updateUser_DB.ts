import mySql from 'mysql';
import { updateUserRouter } from '../../routes/user/updateUser_route';
import { UserInterface } from '../../User-interface';
import databaseConfig from '../Database-config.json'








export default function updateUserDB(updateData, callback){
    let connection: mySql.Connection



    function  connect(){
        connection = mySql.createConnection(databaseConfig)
        connection.connect( (err)=>{
            if(err) {
                console.error("Error connecting to Database:\nError:" + err.stack);
                return
            }
            console.log("Connected as id:" + connection.threadId)
        })
    }
    
    
        connect()
        console.log(updateData)
        
        const updatedFormData: UserInterface = updateData.updateFormData
        const loginData: UserInterface = updateData.loginData

            const {firstname, lastname, newPassword} = {...updatedFormData}
            const {username, password} = {...loginData}

            if(updateData['updateFormData']['changePassword']){
                console.log("Updating User with password change.")
                const changePassSQL = 
                `UPDATE users
                SET firstname = '${firstname}', lastname= '${lastname}' , password= '${newPassword}'
                WHERE username = '${username}' AND password= '${password}';
                `
                connection.query(changePassSQL, (err, res, fields)=>{
                    if(err) throw err
                    return callback({
                        changedRows: res.changedRows,
                        affectedRows: res.affectedRows
                    })
                })                
                connection.end()
            }else{
                const changePassSQL = 
                `UPDATE users
                SET firstname = '${firstname}', lastname= '${lastname}'
                WHERE username = '${username}' AND password= '${password}';
                `
                connection.query(changePassSQL, (err, res, fields)=>{
                    if(err) throw err
                    
                    return callback({
                        changedRows: res.changedRows,
                        affectedRows: res.affectedRows
                    })
                })  
                console.log("Updating User without password change.")
                
                
                connection.end()
            }
        
    }


