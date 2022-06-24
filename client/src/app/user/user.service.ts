import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private http: HttpClient
    ) {}

  getUserData(){
      const token = window.localStorage.getItem('token')
      return this.http.post('/api/user',{token})
  }

  getUserProfileData(user_id){
    return this.http.get(`/api/userProfile?id=${user_id}`)
  }

  

}
