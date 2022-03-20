import { Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})



export class FeedService {


  constructor(private http: HttpClient) { }

  createPost(postData){
    return this.http.post("/api/createPost",postData)
  }

  getAllPosts(){
    return this.http.get("/api/getAllPosts")
  }


}
