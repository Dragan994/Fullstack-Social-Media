import { Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserData } from 'src/Interfaces/UserData.interface';

@Injectable({
  providedIn: 'root'
})



export class RequestPasswordService {



  constructor(
    private http: HttpClient
  ) { }


  requestUpdateUser(loginData: IUserData , updateFormData: IUserData){
    const bodyData = {
        loginData,
        updateFormData
    } 
    return this.http.post("/api/updateUser",bodyData)
  }


}
