import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { TranslatePipe } from '../pipes/Translate.pipe';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DarkModeService } from '../services/darkMode.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  responseData: any
  darkMode = false

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private darkModeService: DarkModeService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    console.log("Login initiated.")
    this.darkMode = this.darkModeService.getDarkModeValue()
  }

  submitForm(){
    this.loginService.requestLogin(this.loginForm.value).subscribe(res=>{
      this.responseData = res;
      if(this.responseData.status==="Wrong credentials"){
        this.loginForm.controls["username"].setErrors({wrongCredentials: true})
        this.loginForm.controls["password"].setErrors({wrongCredentials: true})
        this.clearForm()
      }else if(this.responseData.status==="Wrong password"){        
        this.loginForm.controls["password"].setErrors({wrongPassword: true})
      }else if(this.responseData.status==="Login succesfull"){
        //Set token
        window.localStorage.setItem('token', this.responseData['token'])
        // Go to user
        this.router.navigate(['main'])
      }

    })
  }

  clearForm(){
    setTimeout(()=>{
      this.loginForm.controls["username"].setValue("")
      this.loginForm.controls["password"].setValue("")
      this.loginForm.controls["username"].markAsUntouched({onlySelf:true})
      this.loginForm.controls["password"].markAsUntouched({onlySelf:true})
    },2000)
  }

}
