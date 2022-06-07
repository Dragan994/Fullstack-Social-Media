import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

import { HttpEventType } from '@angular/common/http';
import { UserService } from '../user.service';
@Component({
  selector: 'app-user-photos',
  templateUrl: './user-photos.component.html',
  styleUrls: ['./user-photos.component.scss']
})
export class UserPhotosComponent implements OnInit {
  @Input() user_id

  public userImageList
  userData
  selectedUserImg: File = null
  selectedUserImgSrc
  imgBaseUrl: string
  imageIsUploaded: boolean = false
  constructor(
    private imageService: ImageService,
    private userService: UserService
  ) {
    this.userService.getUserData().subscribe(res=>{
    if(res['message'] === 'Access granted'){
        this.userData = {...res['data']}
      }
    })
  }

  ngOnInit(): void {
    this.updateUserImages()
    this.imageService.deleteImageEvent.subscribe(res=>{
      console.log(res)
      this.updateUserImages()
    })
  }

 updateUserImages(){
   
  this.imageService.getUserImages(this.user_id).subscribe(res=>{
    this.userImageList = res
    console.log("list updated")
  })
 }

  onImageSelected(e){
    this.selectedUserImg = <File>e.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedUserImg)
    
    reader.onload = ()=> {
      const rawLog = reader.result;
      this.selectedUserImgSrc = rawLog
    };
  
  }

  uploadImage(){
    const imageBuffer = new FormData();
    imageBuffer.append('image', this.selectedUserImg, `${this.userData.user_id}`) // For original name i set user_id, need this for DB FK

    this.imageService.uploadImage(imageBuffer).subscribe((event) =>{
      if(event.type === HttpEventType.UploadProgress){
        const loadProgress = Math.round(event.loaded / event.total * 100)
        if(loadProgress === 100){
          this.imageIsUploaded = true
        }
        console.log(`Upload Progress: ${loadProgress}%`)
      }else if(event.type === HttpEventType.Response){
        this.imgBaseUrl = event.body['imgBaseUrl']
        setTimeout(()=>{
          this.selectedUserImgSrc = this.imageService.getImagePath( event.body['imgBaseUrl'], "mid")
          this.updateUserImages()
        },200)
      }
    })
  }

  clearUserImage(){
    if(this.imageIsUploaded){
      this.deleteImage()
    }
    this.selectedUserImg = null
    this.selectedUserImgSrc = null
  }

  deleteImage(){
    
    const imageData = {
      user_id: this.userData.user_id,
      imgBaseUrl: this.imgBaseUrl
    }
    if(this.selectedUserImgSrc){
      console.log(imageData)
      this.imageService.deleteImageByBaseUrl(imageData).subscribe(res=>{
        console.log(res)
      })
    }
  }
  

}
