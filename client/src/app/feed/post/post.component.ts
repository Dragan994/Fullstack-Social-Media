import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LikeListDialogComponent } from 'src/app/dialogs/like-list-dialog/like-list-dialog.component';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit {
  @Input() postData
  @Input() userData
  public noLike = false
  public oneLike = false
   public likeList
   public likeCount
   public commentList = []
   public commentCount
   public hasNoComment
   public hasOneComment 
   public hasManyComments
   public postIsLiked = false
   public commentForm!: FormGroup
   public commentPanelOpenState = false

   


  constructor(
    public dialog: MatDialog ,
    private postService: PostService,
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      comment: [""]
    }) }

  ngOnInit(): void {
    this.postService.getLikeList(this.postData.post_id).subscribe( likeList=>{
      this.updateLikeList(likeList)
      
    })

    this.postService.getPostComments(this.postData.post_id).subscribe(commentListDB=>{
      this.updateComments(commentListDB)
    })


    
      
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

    if(this.likeCount == 0){
      this.oneLike = false
      this.noLike = true
    }else if( this.likeCount == 1){
      this.noLike = false
      this.oneLike = true
    }else{
      this.noLike = false
      this.oneLike = false
    }
  }

  openLikeList(){
    if(this.likeCount != 0){
      this.dialog.open(LikeListDialogComponent, {
        minWidth:"350px",
        maxWidth:'500px',
        height: '50vh',
        data: {
          likeList:this.likeList,
          postData: this.postData
        }
      })
    }
  }

  commentPost(event){
    if(event.keyCode === 13){
      const commentData ={
      post_id :  this.postData.post_id,
      user_id : this.userData.user_id,
      comment_media_url: "empty",
      comment_text : this.commentForm.value['comment']
    }

    if(this.commentForm.value['comment'] !== ""){
      this.postService.commentPost(commentData).subscribe( commentListDB=>{
          console.log(commentListDB)
     

          this.updateComments(commentListDB)
        
      });
           
      this.commentForm.controls['comment'].setValue("")
    }
  }
}


   updateComments(commentList){

    this.commentList = commentList

    this.commentCount = commentList.length
      
    this.hasNoComment = commentList.length === 0
    this.hasOneComment = commentList.length === 1
    this.hasManyComments =  commentList.length > 1




  }


    
}
