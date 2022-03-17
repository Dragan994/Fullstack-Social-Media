import mySql from 'mysql';
import { updateUserRouter } from '../routes/updateUser';
import { UserInterface } from '../User-interface';
import databaseConfig from './Database-config.json'








export default class UpdateUserDB{
    private connection!: mySql.Connection

    private updateUserSQL = 
    `UPDATE users
    SET username
    `

    constructor(){}

    connect(){
        this.connection = mySql.createConnection(databaseConfig)
        this.connection.connect( (err)=>{
            if(err) {
                console.error("Error connecting to Database:\nError:" + err.stack);
                return
            }
            console.log("Connected as id:" + this.connection.threadId)
        })
    }
    
    update(updateData, callback){
        this.connect()
        console.log(updateData)
        
        const updatedFormData: UserInterface = updateData.updateFormData
        const loginData: UserInterface = updateData.loginData

            const {firstname, lastname, newPassword} = {...updatedFormData}
            const {username, password} = {...loginData}

            if(updateData['updateFormData']['changePassword']){
                console.log("Change pass")
                const changePassSQL = 
                `UPDATE users
                SET firstname = '${firstname}', lastname= '${lastname}' , password= '${newPassword}'
                WHERE username = '${username}' AND password= '${password}';
                `
                this.connection.query(changePassSQL, (err, res, fields)=>{
                    if(err) throw err
                    console.log("THIS IS SQL RESPONSE")
                    console.log(res)
                    return callback({
                        changedRows: res.changedRows,
                        affectedRows: res.affectedRows
                    })
                })                
                this.connection.end()
            }else{
                const changePassSQL = 
                `UPDATE users
                SET firstname = '${firstname}', lastname= '${lastname}'
                WHERE username = '${username}' AND password= '${password}';
                `
                this.connection.query(changePassSQL, (err, res, fields)=>{
                    if(err) throw err
                    console.log("THIS IS SQL RESPONSE")
                    
                    return callback({
                        changedRows: res.changedRows,
                        affectedRows: res.affectedRows
                    })
                })  
                console.log("not changing pass")
                
                
                this.connection.end()
            }
        
    }


}