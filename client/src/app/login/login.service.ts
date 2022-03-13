import { Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})



export class LoginService {



  constructor(
    private http: HttpClient
  ) { }


  requestLogin(formData:any){
    return this.http.post("/api/login",formData)
  }


}
