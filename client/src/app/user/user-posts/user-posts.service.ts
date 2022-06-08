import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserPostsService {

  constructor(
    private http: HttpClient
    ) { }


  getUserPosts(user_id){
    return this.http.post('/api/getUserPosts',{user_id})
  }

}
