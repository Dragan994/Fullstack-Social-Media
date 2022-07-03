import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { UserService } from '../user/user.service';

@Injectable({
	providedIn: 'root'
})
export class SocketService {


  userData
  tokenError

	constructor(
    private socket: Socket,
  ) {}


  // Get connection status
  getStatus(){
    return this.socket.connect()
  }
  

  // Event emitters
  emitMessageTo(chat_id){
    this.socket.emit("message", {chat_id})
  }



  // Listen event
  OnNewMessage(chat_id){
    return this.socket.fromEvent(`newMessageTo${chat_id}`)
  }

}