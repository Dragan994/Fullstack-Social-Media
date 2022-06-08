import express  from 'express';
import ip       from 'ip';
import mysql    from 'mysql';
import databaseConfig               from '../src/database/Database-config.json'
import { chatHandlers }             from './chatHandlers';
import { updateUserRouter }         from './routes/user/updateUser_route';
import {userRouter}                 from './routes/user/user_route'
import { registerRouter }           from './routes/user/register_route';
import { loginRouter }              from './routes/user/login_route';
import { createPost }               from './routes/posts/createPost_route';
import { getAllPosts }              from './routes/posts/getAllPosts_route';
import { likePost }                 from './routes/posts/likePost_route';
import { getPostLikeList }          from './routes/posts/getPostLikes_route';
import { commentPost }              from './routes/posts/commentPost_route';
import { getPostsComments }         from './routes/posts/getPostComments_routes';
import { getUserProfileRouter }     from './routes/user/userProfile_route';
import { uploadImageRouter }        from './routes/file/uploadImage_route';
import { deleteImageRouter }        from './routes/file/deleteImage_route';
import { deletePost } from './routes/posts/deletePost_route';
import { getUserImages } from './routes/user/getUserImages_route';
import { getUserPosts } from './routes/posts/getUserPosts_route';


const http      = require('http')
const app       = express();
const socketio  = require('socket.io')
const server    = http.createServer(app)
const io        = socketio(server)


const PORT = 3000
const ADDRESS = ip.address();

app.use(express.json())
app.use("/",express.static(__dirname + '/public', {redirect: false}));
app.use("/image",express.static(__dirname + '/files/images', {redirect: false}));

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

export const pool = mysql.createPool(databaseConfig);


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
app.use(getUserProfileRouter)
app.use(uploadImageRouter)
app.use(deleteImageRouter)
app.use(deletePost)
app.use(getUserImages)
app.use(getUserPosts)
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
