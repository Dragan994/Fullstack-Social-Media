import { Component, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImagePreviewFullscreenComponent } from '../image-preview-fullscreen/image-preview-fullscreen.component';
import { DarkModeService } from '../services/darkMode.service';
import { ImageService } from '../services/image.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-image-preview-thumbnail',
  templateUrl: './image-preview-thumbnail.component.html',
  styleUrls: ['./image-preview-thumbnail.component.scss']
})
export class ImagePreviewThumbnailComponent implements OnInit {
  @Input() imageData
  @Input() imageList
  @Input() userOwnsProfile
  public imageUrl
  darkMode
  userData
  canDeleteImage = true
  isProfilePicture = false
  constructor(
    private imageService: ImageService,
    private dialog: MatDialog,
    private userService: UserService,
    private darkModeService: DarkModeService
  ) { }

  ngOnInit(): void {
    this.darkMode = this.darkModeService.getDarkModeValue()
    this.userData = this.userService.getUserData().subscribe(res=>{
      this.userData = res['data']
    })
    this.imageUrl = this.imageService.getImagePath(this.imageData['image_url'],'big')
    if(this.imageData.image_type==="profile_picture_selected"){
      this.isProfilePicture = true
      this.canDeleteImage = false
    }
  }

  

  openFullscreenPreview(imageData){
    this.dialog.open(ImagePreviewFullscreenComponent,{      
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass:'fullscreen-dialog',
      data:{
        photoList: this.imageList,
        currentPhoto:imageData
      }
    })
  }


  deleteImage(){
    
    const imageData = {
      user_id: this.userData.user_id,
      imgBaseUrl: this.imageData['image_url']
    }
    
    
      this.imageService.deleteImageByBaseUrl(imageData).subscribe(res=>{
        console.log(res)
        const eventData = {
          name: "image_delete",
          data: imageData.imgBaseUrl
        }
        this.imageService.fireUpdateImageEvent(eventData)
      }
        
        )
    
  }
  setImageAsProfilePicture(){
    const imageData = {
      user_id: this.userData.user_id,
      imgBaseUrl: this.imageData['image_url']
    }
    console.log(imageData)
    this.imageService.setImageAsProfilePicture(imageData).subscribe(res=>{
      console.log(res)
      const eventData = {
        name:"profile_picture_update",
        data: this.imageUrl
      }
      this.imageService.fireUpdateImageEvent(eventData)
    })
  }
}
