import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public user_id
  public userData

  constructor(private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit(): void {
    this.user_id = this.route.snapshot.queryParams.id
    console.log(this.user_id)
    this.userService.goToUserProfile(this.user_id).subscribe(res=>{
      console.log(res)
      this.userData = res
    })
  }

}
