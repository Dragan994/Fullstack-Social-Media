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


  requestUpdateUser(user_id , updateFormData: IUserData){
    const bodyData = {
        user_id,
        updateFormData
    } 
    return this.http.post("/api/updateUser",bodyData)
  }


}
