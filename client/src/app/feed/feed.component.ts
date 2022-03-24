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
  public allPosts

  constructor(
    private userService: UserService,
    private feedService: FeedService,
    private fb: FormBuilder) {
      this.postForm = this.fb.group({
        post: [""]
      })
    }

  ngOnInit(): void {
    this.updatePosts()
    
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
        console.log(res)
      })
      
    this.updatePosts() // this is temponary solution i want to use socket io for this...
      this.postForm.controls['post'].setValue("")
    }
  }


updatePosts(){
  this.feedService.getAllPosts().subscribe( posts =>{
    this.allPosts = posts
    this.allPosts.reverse()
  })
}

}
