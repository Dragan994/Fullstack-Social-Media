import { Socket } from "socket.io";




export function initiateMessageHandlers(socket: Socket){

    console.log(socket.id)
    socket.on("message", (data)=>{
        console.log("got message")
        console.log(data)

        const {chat_id, messageSender_id, messageReciever_id} = data
        
            socket.broadcast.emit(`newMessageToChatCard${chat_id}`, {message: "Chat card updated succesfully!"})
            socket.broadcast.emit(`newMessageToChatList${messageSender_id}-${messageReciever_id}`, {message: "Chat List event works"}) 
        
    })
}