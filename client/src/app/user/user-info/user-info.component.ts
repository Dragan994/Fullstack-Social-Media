import { Component, Input, OnInit } from '@angular/core';

import { UserService } from '../user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  @Input() user_id
  userData
  constructor(
   private userService: UserService
  ) { }

  ngOnInit(): void {
    console.log("userInfo")

    this.userService.getUserProfileData(this.user_id).subscribe(userData=>{
      console.log(userData)
      this.userData = userData
    })
  }

}
