import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  @Input() userData
  @Input() messageData;
  chatParticipantUser
  chatParticipantOther 
  
  constructor() { }
  
  ngOnInit(): void {
    this.chatParticipantUser = this.userData['user_id'] == this.messageData['fk_message_user_id']
    this.chatParticipantOther = !this.chatParticipantUser
  }

}
