import express from 'express';
import ip from 'ip';
import { chatHandlers } from './chatHandlers';
import Database from './database/Database';
import {userRouter} from './routes/user'
const http = require('http')
const  app = express();
const socketio = require('socket.io')
const server = http.createServer(app)
const io = socketio(server)


const database = new Database()
const PORT = 3000
const ADDRESS = ip.address();

app.use(express.json())
app.use("/",express.static(__dirname + '/public', {redirect: false}));

app.use( (req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");    
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","OPTIONS, GET, POST, PUT, DELETE");
    if("OPTIONS" == req.method){
        res.sendStatus(200)
    } else {
        console.log(`${req.ip} ${req.method} ${req.url}`)
        next()
    }
})

app.use(userRouter)

const serverData = {
    allClients: [],
    chat: []
}


io.on('connection', socket=>{
    chatHandlers(socket, serverData)
    socket.emit('initialData',serverData)
    //setTimeout(()=>{socket.emit('initialData',serverData)},100)
})








app.get('*', (req,res)=>{
   res.sendFile('index.html', {root: __dirname + '/public'})
})

server.listen(PORT,ADDRESS, ()=>{
    console.log(`Server starting...\nListening at ${ADDRESS}:${PORT}`);
})
const newUserData = {
    firstname: "John",
    lastname: "Doe",
    username: "John",
    email: "john@mail.com",
    password: "12345678",
    token: "no-data"

}

//database.resetUsersTable()
//database.addNewUser(newUserData, (data)=>{console.log(data)})

//database.getUser("Rexyco", (response)=>{console.log(response)})
//database.loginUser("Rexyco","rex123isSafe", (response)=>{console.log({...response[0]})})


