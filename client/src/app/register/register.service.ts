import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  requestRegistration(formData: any){
    console.log("Registration requested.")
    return this.http.post("/api/register",formData)
  }

}
