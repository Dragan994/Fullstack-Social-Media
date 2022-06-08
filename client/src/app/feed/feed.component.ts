import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  UserService } from '../user/user.service';
import { FeedService } from './feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  @Input() userData
  public postForm!: FormGroup
  public allPosts = new Array()

  constructor(
    private feedService: FeedService,
    private fb: FormBuilder) {
      this.postForm = this.fb.group({
        post: [""]
      })
    }

  ngOnInit(): void {
    this.updatePosts()
    this.feedService.UpdateFeedEvent.subscribe(res=>{
      this.updatePosts()
    })
    
  }


  createPost(event){
    const postTextValue = this.postForm.value['post']
    if(postTextValue !== "" && event.keyCode === 13){
      const postData = {
        user_id: this.userData.user_id,
        firstname: this.userData.firstname,
        lastname: this.userData.lastname,
        post_text: postTextValue
      }

      this.feedService.createPost(postData).subscribe( res =>{
          this.updatePosts()
      })
      
      this.postForm.controls['post'].setValue("")
    }
  }


updatePosts(){
  this.feedService.getAllPosts().subscribe( postsList =>{
    const arr = new Array()
    for(let prop in postsList){
      const post = postsList[prop]
      arr.push(post)
    }
    this.allPosts = arr
  })
}

}
