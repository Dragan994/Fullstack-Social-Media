import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LikeListDialogComponent } from 'src/app/dialogs/like-list-dialog/like-list-dialog.component';
import { ICommentList } from './CommentList.Interface';
import { IPost } from '../../../Interfaces/Post.interface';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit {
  @Input() userData
  @Input() postData: IPost
  public noLike = false
  public oneLike = false
   public likeList
   public likeCount
   public commentList
   public noComment = false
   public oneComment = false
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
      comment_img_url: "empty",
      comment_text : this.commentForm.value['comment']
    }

    if(this.commentForm.value['comment'] !== ""){
      this.postService.commentPost(commentData).subscribe( (commentListDB)=>{
        this.updateComments(commentListDB)
      });
           
      this.commentForm.controls['comment'].setValue("")
    }
  }
}


  updateComments(commentListDB){
    const arr = new Array()
    const commentListProps = Object.keys(commentListDB)
    this.commentCount = commentListProps.length
    for(let prop in commentListProps){
      const comment = commentListDB[prop]
      arr.push(comment)
    }
    if(commentListDB.length!==0){
      this.noComment = false
    }
    this.commentList = arr
      
  }


    
}
