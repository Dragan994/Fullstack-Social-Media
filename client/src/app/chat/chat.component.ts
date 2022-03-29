import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocketService } from '../services/socket.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chatIsHidden = true
  userData
  onlineUsersList: any
  chatMessages = []
  chatForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private socketService: SocketService,
    private userService: UserService
  ) {
    this.chatForm = this.fb.group({
      chatText: ['', []]
    });
   }

  ngOnInit(): void {
    
      
      this.userService.getUserData().subscribe(res=>{
        if(res['message'] === 'Access granted'){
           this.userData = {...res['data']}
           //console.log("Chat on init.")
           //console.log(this.userData)
           this.socketService.emitUserConnection(this.userData)
        }
      })

      

        this.socketService.OnMessage().subscribe(msg=>{
        
          if(this.userData['user_id'] === msg['user_id']){
            msg['userMessage'] = true
          }
        this.chatMessages.push(msg)
        // Scroll down chat window
        setTimeout(()=>{this.scrollToChatBottomn()},100);
        })

        this.socketService.OnUserDisconnected().subscribe(onlineUsersList=>{
          this.updateOnlineUsersList(onlineUsersList)
          //console.log("userDisconnected")
          this.updateOnlineUsersList(onlineUsersList)
        })

        this.socketService.OnNewUserConnected().subscribe(onlineUsersList=>{       
          this.updateOnlineUsersList(onlineUsersList)
          //console.log("userConnected")
          //console.log(onlineUsersList)
      })

      this.socketService.OnInitialData().subscribe( initialData=>{
        //console.log(initialData)
        let rawChatMessages = initialData['chat']
        rawChatMessages.forEach(msg=>{
          if(this.userData){

            if(this.userData['user_id'] === msg['user_id']){
              msg['userMessage'] = true
            }
          }else {
            //console.log("UserData")
            //console.log(this.userData['user_id'])
          }



          
        })
        this.chatMessages = initialData['chat']
        this.updateOnlineUsersList(initialData['allClients']) 
      })
      setTimeout(()=>{

        this.checkConnection()
      },200)
  }




  sendMessage(){

    this.chatForm.controls['chatText'].setValue(this.chatForm.value['chatText'].trim())
    if(this.chatForm.value['chatText'] !== ""){
      const message = this.chatForm.value['chatText']
      const messageData ={
        username: this.userData['username'],
        user_id: this.userData['user_id'],
        message: message,
        userMessage: false

      }
      this.socketService.emitMessage(messageData)
      this.chatForm.controls['chatText'].setValue('')
    }
  }

  
  
  scrollToChatBottomn() {
    const chatWindow = document.querySelector('.chat-window')
    const chatWindowBottomn = chatWindow.scrollHeight
    chatWindow.scrollTo({
      top: chatWindowBottomn,
      left:0,
      behavior:'smooth'
    })
  }

  updateOnlineUsersList(onlineUsersList){
    const rawOnlineUsersList:any = onlineUsersList   

    if(rawOnlineUsersList){
      this.onlineUsersList = rawOnlineUsersList.filter((user)=> {
        if(this.userData){

          if(user['user_id'] !== this.userData['user_id']){
            return  user
          }
        }else{
          //console.log("User from server")
          //console.log(user)
          //console.log("User on client")
          //console.log(this.userData)
        }
      
      })
    }
  }

  hideChat(){
    this.chatIsHidden = true
    //console.log('closing chat')
  }

  showChat(){
    //console.log('opening chat')

    this.chatIsHidden = false
  }



  async checkConnection(){
    const conn = await this.socketService.getStatus() // This line of code just solved a problem where i had to refresh browser after login to connect...
    //console.log(conn)
  }

}