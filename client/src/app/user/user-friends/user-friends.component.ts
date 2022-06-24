import { Component, Input, OnInit } from '@angular/core';
import { FriendshipService } from 'src/app/services/friendship.service';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.scss']
})
export class UserFriendsComponent implements OnInit {
  @Input() userData 
  @Input() profileUser_id

  public profileFriendList
  public friendList
  constructor(
    private friendshipService: FriendshipService
  ) { }

  ngOnInit(): void {

    this.loadInitialData()
    console.log(this.profileUser_id)
  }



  async loadInitialData(){
    const response = await this.friendshipService.getProfileFriends(this.profileUser_id).toPromise()
    console.log(response)
    this.friendList = response
      
  }





}
