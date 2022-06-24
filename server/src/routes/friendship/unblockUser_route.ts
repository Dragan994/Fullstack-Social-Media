import  express  from "express";
import { pool } from "../../server";


export const unblockUser = express.Router()


unblockUser.post('/api/unblockUser', (req, res)=>{

    console.log("Unblock user")

    const {friendship_id, friendship_status} = req.body

   
       if(friendship_status === "blocked"){

        const unblockUserWithoutFriendshipSQL = `
        DELETE FROM user_friendship
        WHERE friendship_id = '${friendship_id}'        
        `

        pool.query(unblockUserWithoutFriendshipSQL, (err,data)=>{
            if(err){
                console.error(err.message)
            }

            res.send({message: "Unblocked profile without friendship"})

        })

        

       }else{

           const unblockUserWithFriendshipSQL = `
           UPDATE user_friendship
        SET fk_blocked_by = null
        WHERE friendship_id = '${friendship_id}'
        `
        
        pool.query(unblockUserWithFriendshipSQL, (err, data)=>{
            if(err) throw err;
            console.log(data)
            res.send({message: "Unblocked profile with friendship"})
        })
    }
        

})

