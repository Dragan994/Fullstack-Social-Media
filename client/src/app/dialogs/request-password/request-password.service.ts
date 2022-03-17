import { Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})



export class RequestPasswordService {



  constructor(
    private http: HttpClient
  ) { }


  requestUpdateUser(loginData: {username:string, password:string } , updateFormData){
    const bodyData = {
        loginData,
        updateFormData
    } 
    return this.http.post("/api/updateUser",bodyData)
  }


}
