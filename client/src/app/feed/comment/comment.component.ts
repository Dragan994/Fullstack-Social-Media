import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() commentData

  public userPictureUrl?

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get('https://dog.ceo/api/breeds/image/random')
    .subscribe(imgUrl => {
      this.userPictureUrl = imgUrl['message']
    })
  }





}
