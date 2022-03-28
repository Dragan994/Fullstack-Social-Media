import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/feed/post/Post.interface';

@Component({
  selector: 'app-user-post-owner',
  templateUrl: './user-post-owner.component.html',
  styleUrls: ['./user-post-owner.component.scss']
})
export class UserPostOwnerComponent implements OnInit {

  @Input() postData: IPost
  public time
  public date

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.convertDateToString()
    console.log(this.postData)
  }






  convertDateToString(){
    const rawDateTime = this.postData.date_of_creation.split("T")
    const rawDate = rawDateTime[0].split("-")
    this.date = rawDate.join("/")
    const rawTime = rawDateTime[1].split(':',2)
    this.time = rawTime.join(':')
  }



}
