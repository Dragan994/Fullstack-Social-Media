import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-snackbar',
  templateUrl: './user-snackbar.component.html',
  styleUrls: ['./user-snackbar.component.scss']
})
export class UserSnackbarComponent implements OnInit {
  
  @Input() userData
  public userPicture?
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getPicture()
  }




  getPicture(){
    this.http.get('https://dog.ceo/api/breeds/image/random').subscribe(data=>{
      this.userPicture = data['message']
      console.log(data)
    })

  }

}
