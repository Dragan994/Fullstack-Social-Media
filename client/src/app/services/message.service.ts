import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http: HttpClient
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


}
