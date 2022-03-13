import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;
  responseData: any

  constructor(
      private registerService: RegisterService,
      private fb: FormBuilder,
      private router: Router,
      private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],

      password: ['', [Validators.required, Validators.minLength(6)]],      
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    console.log("Register initiated.")
  }

  submitForm(){
    this.registerService.requestRegistration(this.loginForm.value).subscribe( (response) => {
      this.responseData = response;
      if(this.responseData.status === "User created succesfully."){
        this.userService.setUserData(this.responseData)
        this.router.navigate(["login"])
      }
      console.log(this.responseData)
    } )
  }
}
