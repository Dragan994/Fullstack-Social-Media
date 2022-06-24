import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { UserPostsService } from './user-posts.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {

  @Input() user_id
  userPosts
  userData
  constructor(
    private userPostsService: UserPostsService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUserData().subscribe(res=>{
      if(res['message'] === 'Access granted'){
        this.userData = res['data']
      }
    })
    this.userPostsService.getUserPosts(this.user_id).subscribe( userPosts => {
      console.log(userPosts)
      this.userPosts = userPosts
    })
  }
}
