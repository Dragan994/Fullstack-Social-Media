import { HttpClient } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  @Output() updateImageEvent = new EventEmitter() 

  constructor(
    private http: HttpClient
  ) {}


  fireUpdateImageEvent(eventData){
      this.updateImageEvent.emit(eventData)
    }

 
  uploadImage(imageData){
    return this.http.post('/api/uploadImage',imageData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  deleteImageByBaseUrl(imageData){
    return this.http.post('/api/deleteImage', imageData)
  }

  getImagePath(base_url, size){
    const image_url = `${base_url}-${size}.jpg`
   return `${environment.apiUrl}image/${image_url}`
  }


  getUserImages(user_id){
    return this.http.post('/api/getUserImages', {user_id})
  }

  setImageAsProfilePicture(imageData){
    return this.http.post('/api/setProfilePicture', imageData)
  }
  getUserProfilePicture(user_id){
    return this.http.post('/api/getProfilePicture', {user_id})
  }

  setDefaultProfilePicture(){

    return "../../assets/images/defaulf_profile_picture.jpg"

  }



}
