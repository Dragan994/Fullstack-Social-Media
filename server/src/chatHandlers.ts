import { Socket } from "socket.io";

export function chatHandlers(socket:Socket, serverData){
    let currentClient
    // Identify user
    socket.on('userConnection', newClient=>{
        console.log(socket.id)
        currentClient = {...newClient}
        currentClient.socket_id = socket.id
        // If user is connected dont push him in array
        const userFound = serverData['allClients'].find(user=> user['user_id'] === currentClient['user_id'])
        if(!userFound && newClient !== null){
            serverData['allClients'].push(currentClient)
        }
        socket.broadcast.emit('newUserConnected', serverData['allClients'])
        // Online users without me

        socket.emit('newUserConnected', serverData['allClients'])
        console.log("newUserConnected")
        console.log(currentClient)
    })
    
    

 


 // Broadcasts when user disconnects
 socket.on('disconnect', (e)=>{
     // Emit online users
     const allClientsList = serverData['allClients'].filter( client=> client['socket_id'] !== socket.id)
     serverData['allClients'] = allClientsList
     socket.broadcast.emit('userDisconnected', serverData['allClients'])
})

 socket.on('message', (msgData)=>{
    serverData['chat'].push(msgData)
    socket.emit('message', msgData) // For client to see his message
    socket.broadcast.emit("message", msgData) // For client to see others messages
 })



}