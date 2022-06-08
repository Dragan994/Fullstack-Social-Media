import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FeedService } from 'src/app/feed/feed.service';
import { PostService } from 'src/app/feed/post/post.service';
import { DarkModeService } from 'src/app/services/darkMode.service';

@Component({
  selector: 'app-post-delete-prompt',
  templateUrl: './post-delete-prompt.component.html',
  styleUrls: ['./post-delete-prompt.component.scss']
})
export class PostDeletePromptComponent implements OnInit {

  darkMode= false

  constructor(
    private postService: PostService,
    private feedService: FeedService,
    private darkModeService: DarkModeService,
    public dialogRef: MatDialogRef<PostDeletePromptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data)
    this.darkMode = this.darkModeService.getDarkModeValue()
  }



  deletePost(){
    this.postService.deletePost(this.data['post_id']).subscribe(res=>{
      this.feedService.updateFeed()
      this.dialogRef.close()
      console.log(res)
    })
  }

}
