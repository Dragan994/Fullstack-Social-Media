import { HttpClient } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  @Output() deleteImageEvent = new EventEmitter() 

  constructor(
    private http: HttpClient
  ) {}


  fireDeleteImageEvent(){
      this.deleteImageEvent.emit("ok")
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




}
