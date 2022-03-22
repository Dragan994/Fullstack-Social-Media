import express from 'express';
import ip from 'ip';
import { chatHandlers } from './chatHandlers';
import Database from './database/Database';
import { updateUserRouter } from './routes/user/updateUser_route';
import {userRouter} from './routes/user_route'
import { registerRouter } from './routes/user/register_route';
import { loginRouter } from './routes/user/login_route';
import { createPost } from './routes/posts/createPost_route';
import { getAllPosts } from './routes/posts/getAllPosts_route';
import { likePost } from './routes/posts/likePost_route';
import { getPostLikeList } from './routes/posts/getPostLikes_route';
import { commentPost } from './routes/posts/commentPost_route';
import { getPostsComments } from './routes/posts/getPostComments_routes';
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

app.use(registerRouter)
app.use(loginRouter)
app.use(updateUserRouter)
app.use(userRouter)
app.use(createPost)
app.use(getAllPosts)
app.use(likePost)
app.use(getPostLikeList)
app.use(commentPost)
app.use(getPostsComments)

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
    username: "Johny",
    email: "john@mail.com",
    password: "12345678",

}

//database.resetUsersTable()
//database.resetPostsTable()
//database.resetLikesTable()
//database.resetCommentsTable()
//database.addNewUser(newUserData, (data)=>{console.log(data)})

//database.getUser("Rexyco", (response)=>{console.log(response)})
//database.loginUser("Rexyco","rex123isSafe", (response)=>{console.log({...response[0]})})


