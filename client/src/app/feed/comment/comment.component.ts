import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() userData
  @Input() commentData
  public time
  public date

public user_image_url 
  constructor(
    private router: Router,
    private imageService: ImageService

  ) { }

  ngOnInit(): void {

    this.loadInitialData()

    this.user_image_url = this.imageService.getImagePath(this.commentData['image_url'], "small")
    
  }


  async loadInitialData(){
    const user_id = this.commentData['user_id']    
    const profilePictureData = await this.imageService.getUserProfilePicture(user_id).toPromise()
    if(profilePictureData['message'] === "image_url not found"){
      this.user_image_url = this.imageService.setDefaultProfilePicture()
    }else{
      this.user_image_url = this.imageService.getImagePath(profilePictureData['image_url'],"mid")
    }
  }


  goToUserProfile(){
    const user_id = this.commentData.user_id
    this.router.navigate(['/userProfile'], {queryParams:{id: user_id}})
  }
}
