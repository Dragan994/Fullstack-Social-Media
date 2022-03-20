import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MainViewService } from '../mainView/main-view.service';
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
    private userService: MainViewService,
    private feedService: FeedService,
    private fb: FormBuilder) {
      this.postForm = this.fb.group({
        post: [""]
      })
    }

  ngOnInit(): void {
    this.feedService.getAllPosts().subscribe( posts =>{
      this.allPosts = posts
      this.allPosts.reverse()
    })
  }


  createPost(){
    const postTextValue = this.postForm.value['post']
    if(postTextValue !== ""){
      const postData = {
        user_id: this.userData.user_id,
        firstname: this.userData.firstname,
        lastname: this.userData.lastname,
        post_text: postTextValue
      }

      this.feedService.createPost(postData).subscribe( res =>{
        console.log(res)
      })

      this.postForm.controls['post'].setValue("")
    }
  }




}
