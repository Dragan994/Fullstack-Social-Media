import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PostDeletePromptComponent } from 'src/app/dialogs/post-delete-prompt/post-delete-prompt.component';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-post-owner',
  templateUrl: './user-post-owner.component.html',
  styleUrls: ['./user-post-owner.component.scss']
})
export class UserPostOwnerComponent implements OnInit {
  @Input() userData
  @Input() postData
  public time
  public date
  public user_image_url
  public canDeletePost = false

  constructor(
    private router: Router,
    private imageService: ImageService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadInitialData()   
  }

  async loadInitialData(){

    const user_id = this.userData['user_id']
    const postOwner_id = this.postData['user_id']

    if(user_id === postOwner_id){
      this.canDeletePost = true
    }

    const profilePictureData = await this.imageService.getUserProfilePicture(postOwner_id).toPromise()
    if(profilePictureData['message'] === "image_url not found"){
      this.user_image_url = this.imageService.setDefaultProfilePicture()
    }else{
      this.user_image_url = this.imageService.getImagePath(profilePictureData['image_url'],"mid")
    }




  } // loadInitialData >> END






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
