import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http: HttpClient,
    private socket: Socket
  ) { }


  getChatId(user_id, chat_participant_id){
    return this.http.post("/api/getChatId", {user_id, chat_participant_id})
  }

  sendMessage({chat_id, user_id,  messageText}){
    return this.http.post("/api/sendMessage", {chat_id, user_id, messageText})
  }

  getChatMessagList(chat_id){
    return this.http.post("/api/getChatMessageList", {chat_id})
  }
  
  

  // SOCKET.IO
  
  emitMessageTo(chat_id, messageSender_id, messageReciever_id ){
    const  data = {
      chat_id,
      messageSender_id,
      messageReciever_id
    }
    this.socket.emit("message", data)
  }

  onNewMessageToChatCard(chat_id){
    return this.socket.fromEvent(`newMessageToChatCard${chat_id}`)
  }
  
  onNewMessageToChatList(messageSender_id, messageReciever_id){
    return this.socket.fromEvent(`newMessageToChatList${messageSender_id}-${messageReciever_id}`)
  }

}
