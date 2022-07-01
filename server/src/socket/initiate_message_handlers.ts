import { Socket } from "socket.io";




export function initiateMessageHandlers(socket: Socket){

    console.log(socket.id)
    socket.on("message", (data)=>{
        console.log("got message")
        console.log(data)

        const {chat_id} = data

        socket.broadcast.emit(`newMessageTo${chat_id}`, {message: "Chat card updated succesfully!"})

    })
}