import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChatComponent } from '../chat/chat.component';
import { MessageService } from '../services/message.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss']
})
export class ChatCardComponent implements OnInit {

  chatData
  messageList

  @Input() userData
  @Input() chatCardData
  @Input() cardIsOpen
  @Output() openChatCardEvent = new EventEmitter()
  @Output() removeChatCardEvent = new EventEmitter()
  @Output() closeChatCardEvent = new EventEmitter()

  public chatMessageForm: FormGroup
  
  private openChatCartSubscription: Subscription

  constructor(
    private chatComponent: ChatComponent,
    private fb: FormBuilder,
    private messageService: MessageService,
    private socketService: SocketService
  ) {
    this.chatMessageForm = this.fb.group({      
      chatMessage: ['']
    }) }

  ngOnInit(): void {
    this.loadInitialData()
  }


  ngOnDestroy(){
    this.openChatCartSubscription.unsubscribe()
  }

  async loadInitialData(){
    
    this.openChatCartSubscription = this.chatComponent.openChatCardEvent
      .subscribe(openChatCard=>{
        if(openChatCard['user_id'] === this.chatCardData['user_id']){this.openChatCard()}
      });

    const user_id = this.userData['user_id']
    const chat_participant_id = this.chatCardData['user_id']
    

    this.chatData = await this.messageService.getChatId( user_id, chat_participant_id ).toPromise()

    this.messageList = await this.messageService.getChatMessagList(this.chatData['chat_id']).toPromise()
    
    
    setTimeout(()=>{
      this.scrollToBottom()
    },200)
    
  }



  openChatCard(){    
    this.cardIsOpen = true
    this.openChatCardEvent.emit(this.chatCardData)
  }

  minimizeChatCard(){
    this.cardIsOpen = false
    this.closeChatCardEvent.emit(this.chatCardData)
  }

  removeChatCard(){
    this.removeChatCardEvent.emit(this.chatCardData)
  }




  async sendMessage($event){
    
    if($event.keyCode === 13 && !$event.shiftKey){

    const chat_id = this.chatData['chat_id']
    const user_id = this.userData['user_id']
    const messageText = this.chatMessageForm.controls['chatMessage'].value.trim()
      
      // NOTE: $event.preventDefault() is not preventing textarea from creating new row

      if(messageText.length !== 0){
      // Empty messages will not be sent

        this.chatMessageForm.controls['chatMessage'].setValue("")
        const messageData = {
          chat_id,
          user_id,
          messageText
        }
        const response = await this.messageService.sendMessage(messageData).toPromise()
        console.log(response)
        
       this.scrollToBottom()
      }
      else{
        this.chatMessageForm.controls['chatMessage'].setValue("")
      }
    }
  }


  scrollToBottom(){
    const messageListDiv = document.getElementById("message-list-container")    
    const messageListHeight = messageListDiv.scrollHeight
    messageListDiv.scrollTop = messageListHeight
  }

}
