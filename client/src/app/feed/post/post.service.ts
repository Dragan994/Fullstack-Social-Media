import { Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})



export class PostService {


  constructor(private http: HttpClient) { }

  likePost(post_id, user_id){
      const likeData = {
        post_id,
        user_id
      }
      return this.http.post('/api/likePost', likeData)
  }

  getLikeList(post_id){
      return this.http.post('/api/getPostLikeList', {post_id})
  }

  commentPost(commentData){
    return this.http.post('/api/commentPost',commentData)
  }

  getPostComments(post_id){
      const postData = {
          post_id
      }
      return this.http.post('/api/getPostComments', postData)
  }


  deletePost(post_id){
    const postData = {
          post_id
      }
    return this.http.post('/api/deletePost', postData)
  }


}
