import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from 'src/utils/ConfirmedValidator';
import { DarkModeService } from '../services/darkMode.service';
import {  UserService } from '../user/user.service';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  responseData: any
  selectedImgSrc
  selectedUserImg
  darkMode = false

  constructor(
      private registerService: RegisterService,
      private fb: FormBuilder,
      private router: Router,
      private darkModeService: DarkModeService
  ) {
    this.registerForm = this.fb.group({
      
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],

      password: ['', [Validators.required, Validators.minLength(6)]],      
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },{
      validator: ConfirmedValidator('password', 'confirmPassword')
    });
  }

  ngOnInit(): void {
    console.log("Register initiated.")
    this.darkMode = this.darkModeService.getDarkModeValue()
  }

  submitForm(){
    this.registerService.requestRegistration(this.registerForm.value).subscribe( (response) => {
      this.responseData = response;
      if(this.responseData.status === "User created succesfully."){
        //this.userService.setUserData(this.responseData)
        this.router.navigate(["login"])
      }
      console.log(this.responseData)
    } )
  }



  onImgSelected(e){
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(file) 
    
    reader.onload = ()=> {
      const rawLog = reader.result;
      this.selectedImgSrc = rawLog
  };
  
  }

  uploadImage(){

  }
  clearUserImg(){
    this.selectedUserImg = null
    this.selectedImgSrc = null
  }
}
