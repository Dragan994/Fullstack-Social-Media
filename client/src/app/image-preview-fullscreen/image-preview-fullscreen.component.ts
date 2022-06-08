import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DarkModeService } from '../services/darkMode.service';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-image-preview-fullscreen',
  templateUrl: './image-preview-fullscreen.component.html',
  styleUrls: ['./image-preview-fullscreen.component.scss']
})
export class ImagePreviewFullscreenComponent implements OnInit {
  darkMode
  image_description
  imageUrl
  currentPhoto
  notFirstPhoto = true
  notLastPhoto = true
  constructor(
    private darkModeService: DarkModeService,
    private imageService: ImageService,
    public dialogRef: MatDialogRef<ImagePreviewFullscreenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.darkMode = this.darkModeService.getDarkModeValue()
    console.log(this.data)

    this.updateImage(this.data.currentPhoto)
  }

  closePreview(){
    this.dialogRef.close()
  }

  showPreviousImage(){
    const currentImageIndex = this.getCurrentImageIndex()
    this.currentPhoto = this.data.photoList[currentImageIndex - 1]
    this.updateImage(this.currentPhoto)
  }

  showNextImage(){
    const currentImageIndex =   this.getCurrentImageIndex()
    this.currentPhoto = this.data.photoList[currentImageIndex + 1]
    this.updateImage(this.currentPhoto)
  }
  


  getCurrentImageIndex(){
    return parseInt(Object.keys(this.data.photoList).find(key => this.data.photoList[key] === this.currentPhoto))
  }

  updateImage(currentPhoto){
    this.currentPhoto = currentPhoto
    const currentPhotoIndex = this.getCurrentImageIndex()
    const lastPhotoIndex = this.data.photoList.length -1
    this.imageUrl = this.imageService.getImagePath(this.currentPhoto['image_url'],'big')
    this.image_description = currentPhoto['image_description']
    console.log(currentPhotoIndex)
    
    if(currentPhotoIndex !== 0){
      this.notFirstPhoto = true
    }else{      
      this.notFirstPhoto = false
    }
    if(currentPhotoIndex !== lastPhotoIndex){
      this.notLastPhoto = true
    }else{      
      this.notLastPhoto = false
    }
  }

}
