import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-like-list-dialog',
  templateUrl: './like-list-dialog.component.html',
  styleUrls: ['./like-list-dialog.component.scss']
})
export class LikeListDialogComponent implements OnInit {
  public postData
  public likeList
  darkMode = true


  constructor(
    public dialogRef: MatDialogRef<LikeListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log("LikeList dialog inited.")
    this.postData = this.data.postData
    this.likeList = this.data.likeList
    
    if(localStorage.getItem('darkMode')==='true'){
      this.darkMode = true
    }else{
      this.darkMode = false
    }
  }

  closeLikeList(){
    this.dialogRef.close()
  }


}
