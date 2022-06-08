import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PostDeletePromptComponent } from 'src/app/dialogs/post-delete-prompt/post-delete-prompt.component';
import { FeedService } from 'src/app/feed/feed.service';
import { PostService } from 'src/app/feed/post/post.service';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-post-owner',
  templateUrl: './user-post-owner.component.html',
  styleUrls: ['./user-post-owner.component.scss']
})
export class UserPostOwnerComponent implements OnInit {

  @Input() postData
  public time
  public date
  user_image_url
  public canDeletePost = false

  constructor(
    private router: Router,
    private imageService: ImageService,
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.convertDateToString()
    this.user_image_url = this.imageService.getImagePath(this.postData['image_url'], "small")

    this.userService.getUserData().subscribe(userData=>{
      const user_id = userData['data']['user_id']
      const postOwner_id = this.postData['user_id']
      if(user_id === postOwner_id){
        this.canDeletePost = true
      }
    })
    
  }






  convertDateToString(){
    const rawDateTime = this.postData.date_of_creation.split("T")
    const rawDate = rawDateTime[0].split("-")
    this.date = rawDate.join("/")
    const rawTime = rawDateTime[1].split(':',2)
    this.time = rawTime.join(':')
  }


  deletePost(){
    this.dialog.open(PostDeletePromptComponent,{
      minWidth: 300,
      data: this.postData
    })
  }

  goToUserProfile(){
    const user_id = this.postData.user_id
    this.router.navigate(['/userProfile'], {queryParams:{id: user_id}})
  }
}
