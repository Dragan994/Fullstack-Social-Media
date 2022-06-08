import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() commentData
  public time
  public date

public user_image_url 
  constructor(
    private router: Router,
    private imageService: ImageService

  ) { }

  ngOnInit(): void {
    this.user_image_url = this.imageService.getImagePath(this.commentData['image_url'], "small")
    this.convertDateToString()
  }



  convertDateToString(){
    const rawDateTime = this.commentData.date_of_creation.split("T")
    const rawDate = rawDateTime[0].split("-")
    this.date = rawDate.join("/")
    const rawTime = rawDateTime[1].split(':',2)
    this.time = rawTime.join(':')
  }

  goToUserProfile(){
    const user_id = this.commentData.user_id
    this.router.navigate(['/userProfile'], {queryParams:{id: user_id}})
  }
}
