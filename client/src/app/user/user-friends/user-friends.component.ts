import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.scss']
})
export class UserFriendsComponent implements OnInit {

  @Input() user_id
  constructor() { }

  ngOnInit(): void {
  }

}
