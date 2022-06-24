import express from 'express'
import { pool } from '../../server'



export const getProfileFriends = express.Router()



getProfileFriends.post("/api/getProfileFriends", async (req, res)=>{
    
    
    const { profile_id }  = req.body
    
    console.log(profile_id)


    function getAcceptedFriendList(){

        return new Promise(function(resolve, reject){

            const getAcceptedFriendsSQL = `
            SELECT
                user_id,
                firstname,
                lastname
            FROM sql_social_media.user_profile
            WHERE user_id IN(
                SELECT fk_requester_id
                FROM sql_social_media.user_friendship
                WHERE fk_addressee_id = '${profile_id}'  AND status = 'accepted'
            )
            `
            pool.query(getAcceptedFriendsSQL,  (err, data)=>{
                if(err){
                    console.log(err.message)
                    res.send({message: err.message})
                    return reject(err)
                }

                resolve(data)
            })
        })

    }

    function getRequestedFriendList(){

        return new Promise(function(resolve, reject){

            const getRequestedFriendsSQL = `
            SELECT
                user_id,
                firstname,
                lastname
            FROM sql_social_media.user_profile
            WHERE user_id IN(
                SELECT fk_addressee_id
                FROM sql_social_media.user_friendship
                WHERE fk_requester_id = '${profile_id}'  AND status = 'accepted'
            )
            `
            pool.query(getRequestedFriendsSQL,  (err, data)=>{
                if(err){
                    console.log(err.message)
                    res.send({message: err.message})
                    return reject(err)
                }

                resolve(data)
            })
        })
    }



    const P_accepted =  getAcceptedFriendList()
    const P_requested =   getRequestedFriendList()

    const mainData = await Promise.all([P_accepted, P_requested])
    
    // Converting RowDataPackets to array items
    
    const friendListArr = []
    for(let set in mainData){
       const friendList: Object = mainData[set]
       for(let user in  friendList){
        console.log(friendList[user])
        friendListArr.push(friendList[user])
        }
    }
    

    res.send(friendListArr)
    //console.log(mainData)

})


