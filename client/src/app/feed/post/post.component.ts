import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LikeListDialogComponent } from 'src/app/dialogs/like-list-dialog/like-list-dialog.component';
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
   public commentList
   public noComment = false
   public commentCount
   public postIsLiked = false
   public commentForm!: FormGroup

   


  constructor(
    public dialog: MatDialog ,
    private postService: PostService,
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      comment: [""]
    }) }

  ngOnInit(): void {
    
    //console.log(this.postData)
    //console.log(this.userData)
    setTimeout(()=>{

      this.postService.getLikeList(this.postData.post_id).subscribe( likeList=>{
        this.updateLikeList(likeList)
      })
      this.updateComments()
      
    },1000)
    
  }



  likePost(){
    const post_id = this.postData.post_id
    const user_id = this.userData.user_id

    this.postService.likePost(post_id, user_id).subscribe(likeList => {
      this.updateLikeList(likeList)
    })

    
  }

  updateLikeList(likeList){
    const user_id = this.userData.user_id
    

    const tempArr = [...likeList]
    const userLikedPost = tempArr.find(like=>like['user_id'] === user_id)
    this.postIsLiked = !!userLikedPost
    this.likeList = tempArr
    this.likeCount = tempArr['length']
  }

  openLikeList(){
    console.log(this.likeList)
    this.dialog.open(LikeListDialogComponent, {
      width:'500px',
      data: {
        likeList:this.likeList,
        postData: this.postData
      }
    })
  }

  commentPost(){

    const commentData ={
      post_id :  this.postData.post_id,
      user_id : this.userData.user_id,
      comment_text : this.commentForm.value['comment']
    }
    if(this.commentForm.value['comment'] !== ""){
      this.postService.commentPost(commentData).subscribe(res=>{
        console.log(res)
      })
      
      this.commentForm.controls['comment'].setValue("")
    }
  }


  updateComments(){
    this.postService.getPostComments(this.postData.post_id).subscribe(commentList=>{
      console.log("Comments HERE")
      console.log(commentList)
      if(commentList['length'] == 0){
        this.noComment = true
      }else{
        this.commentCount = commentList['length']
        this.commentList = commentList
      }
    })
  }



    
}
