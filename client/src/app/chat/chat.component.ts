import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FriendshipService } from '../services/friendship.service';
import { SocketService } from '../services/socket.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() userData
  @Output() openChatCardEvent = new EventEmitter()

  onlineUsersList: any
  public friendList
  public activeChatCards = []

  chatForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private socketService: SocketService,
    private friendshipService: FriendshipService
  ) {
    this.chatForm = this.fb.group({
      chatText: ['', []]
    });
   }

  ngOnInit(): void {
    this.activeChatCards = this.getActiveChatCardList()
    this.loadInitialData()
    console.log(this.activeChatCards)
  }



  async loadInitialData(){

    const friendList = await this.friendshipService.getProfileFriends(this.userData['user_id']).toPromise()
    this.friendList = friendList
  }



  openChat(profileUserData){
     profileUserData.cardIsOpen = true
     const cardIsActive = this.activeChatCards.find(activeCard => activeCard['user_id'] === profileUserData['user_id'])
    if(cardIsActive){
      this.openChatCardEvent.emit(profileUserData)
    }else{
      this.activeChatCards.push(profileUserData)
    }
    this.updateActiveChatCardList()
  }

  openChatCard(chatParticipantCard){
    this.activeChatCards.map(activeChatCard => {
      if(activeChatCard === chatParticipantCard){
        activeChatCard.cardIsOpen = true
        return activeChatCard
      }
      return activeChatCard      
    }) 
    this.updateActiveChatCardList()
  }

  closeChatCard(chatParticipantCard){
    this.activeChatCards.map(activeChatCard => {
      if(activeChatCard === chatParticipantCard){
        activeChatCard.cardIsOpen = false
        return activeChatCard
      }
      return activeChatCard      
    }) 
    this.updateActiveChatCardList()
  }

  removeChatCard(chatParticipant){
    const filteredActiveCards = this.activeChatCards.filter(_chatParticipant=> _chatParticipant !== chatParticipant)
    this.activeChatCards = filteredActiveCards
    this.updateActiveChatCardList()
  }



  updateActiveChatCardList(){
    const chatCardList =  JSON.stringify(this.activeChatCards)
    localStorage.setItem("chatCardList",chatCardList)
  }

  getActiveChatCardList(){
    const chatCardList = JSON.parse(localStorage.getItem("chatCardList"))
    if(chatCardList){
      return chatCardList
    }else{
      return []
    }
  }


}