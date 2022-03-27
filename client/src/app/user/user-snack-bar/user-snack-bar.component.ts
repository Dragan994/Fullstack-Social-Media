import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-snack-bar',
  templateUrl: './user-snack-bar.component.html',
  styleUrls: ['./user-snack-bar.component.scss']
})
export class UserSnackBarComponent implements OnInit {

  @Input() userData
  public userPicture?

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    console.log('User snackbar inited')
    this.getPicture()
  }


  getPicture(){
    this.http.get('https://dog.ceo/api/breeds/image/random').subscribe(data=>{
      this.userPicture = data['message']
    })

  }

}
