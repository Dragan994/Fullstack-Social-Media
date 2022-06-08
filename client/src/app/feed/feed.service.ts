import { EventEmitter, Injectable, OnInit, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})



export class FeedService {
  @Output() UpdateFeedEvent = new EventEmitter()

  constructor(private http: HttpClient) { }

  createPost(postData){
    return this.http.post("/api/createPost",postData)
  }

  getAllPosts(){
    return this.http.get("/api/getAllPosts")
  }

  updateFeed(){
    this.UpdateFeedEvent.emit(true)
  }


}
