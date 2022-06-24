import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {
  @Input() userData
  public imgBaseUrl
  imageIsUploaded
  selectedUploadImgSrc
  selectedUserImage: File = null
  constructor(
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
  }

  onImageSelected(e){
    console.log('imageSelected')
    this.selectedUserImage = <File>e.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedUserImage)
    
    reader.onload = ()=> {
      const rawLog = reader.result;
      this.selectedUploadImgSrc = rawLog
    };
  
  }
  

  uploadImage(){
    const imageBuffer = new FormData();
    console.log(this.userData)
    imageBuffer.append('image', this.selectedUserImage, `${this.userData['user_id']}`) // For original name i set user_id, need this for DB FK

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
          this.selectedUploadImgSrc = this.imageService.getImagePath( event.body['imgBaseUrl'], "mid")
          
        },200)
      }
    })
  }

  clearUserImage(){
    if(this.imageIsUploaded){
      this.deleteImage()
    }
    this.selectedUserImage = null
    this.selectedUploadImgSrc = null
  }
  deleteImage(){
    
    const imageData = {
      user_id: this.userData.user_id,
      imgBaseUrl: this.imgBaseUrl
    }
    if(this.selectedUploadImgSrc){
      console.log(imageData)
      this.imageService.deleteImageByBaseUrl(imageData).subscribe(res=>{
        console.log(res)
      })
    }
  }



}
