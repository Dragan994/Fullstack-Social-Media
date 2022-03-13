import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';  

@Injectable({
	providedIn: 'root'
})
export class SocketService {
	constructor(private socket: Socket) {}
  // Get connection status
  getStatus(){
    return this.socket.connect()
  }
  

  // Emit event
  emitMessage(data){
    this.socket.emit('message', data)
  }

  emitUserConnection(userData){
    this.socket.emit('userConnection',userData)
  }

  emitUserDisconnection(){
    this.socket.disconnect()
  }

  // Listen event
  OnMessage(){
    return this.socket.fromEvent('message')
  }

  OnNewUserConnected(){
    return this.socket.fromEvent('newUserConnected')
  }

  OnUserDisconnected(){
    return this.socket.fromEvent('userDisconnected')
  }
  OnInitialData(){
    return this.socket.fromEvent('initialData')
  }

}