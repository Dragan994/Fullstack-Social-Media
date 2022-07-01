import express  from 'express';
import ip       from 'ip';
import mysql    from 'mysql';
import databaseConfig               from '../src/database/Database-config.json'
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
import { setProfilePicture } from './routes/file/setProfilePicture_route';
import { getProfilePicture } from './routes/file/getProfilePicture_route';
import { sendFriendRequest } from './routes/friendship/sendFriendRequest_route';
import { getFriendshipStatus } from './routes/friendship/getFriendshipStatus_route';
import { acceptFriendship } from './routes/friendship/acceptFriendship_route';
import { cancelFriendship } from './routes/friendship/cancelFriendship_route';
import { blockUser } from './routes/friendship/blockUser_route';
import { unblockUser } from './routes/friendship/unblockUser_route';
import { getProfileFriends } from './routes/friendship/getProfileFriends_route';
import { sendMessage } from './routes/message/sendMessage_route';
import { getChatId } from './routes/message/getChatId_route';
import { getChatMessageList } from './routes/message/getChatMessageList_route';
import { initiateMessageHandlers } from './socket/initiate_message_handlers';


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
app.use(setProfilePicture)
app.use(getProfilePicture)
app.use(sendFriendRequest)
app.use(getFriendshipStatus)
app.use(acceptFriendship)
app.use(cancelFriendship)
app.use(blockUser)
app.use(unblockUser)
app.use(getProfileFriends)
app.use(sendMessage)
app.use(getChatId)
app.use(getChatMessageList)





io.on('connection', socket=>{
    initiateMessageHandlers(socket)
})



app.get('*', (req,res)=>{
   res.sendFile('index.html', {root: __dirname + '/public'})
})

server.listen(PORT,ADDRESS, ()=>{
    console.log(`Server starting...\nListening at ${ADDRESS}:${PORT}`);
})
