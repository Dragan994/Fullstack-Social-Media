import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient
  ) { }


 
  uploadImage(imageData){
    return this.http.post('/api/uploadImage',imageData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  deleteImageByBaseUrl(baseUrl){
    return this.http.post('/api/deleteImage', baseUrl)
  }
}
