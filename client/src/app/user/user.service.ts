import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userData = null;
  constructor(private http: HttpClient, private router: Router) {}

  setUserData(data){
    this.userData = data
  }
  getUserData(){
      const token = window.localStorage.getItem('token')
      
      return this.http.post('/api/user',{token})
      
  }

}
