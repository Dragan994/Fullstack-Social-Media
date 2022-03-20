import { Component, Input, OnInit } from '@angular/core';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() userData
  @Input() postData
   public likeList
   public likeCount
   public usersPost = false



  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    console.log(this.postData)
    console.log(this.userData)
    this.postService.getLikeList(this.postData.post_id).subscribe( res=>{
      this.updateLikeList(res)
    })
  }



  likePost(){
    const post_id = this.postData.post_id
    const user_id = this.userData.user_id

    this.postService.likePost(post_id, user_id).subscribe(res => {
      console.log(res)
      this.updateLikeList(res)
    })
  }

  updateLikeList(res){
 
    const tempArr = res
    this.likeList = tempArr
    this.likeCount = tempArr['length']
  }
    
}
