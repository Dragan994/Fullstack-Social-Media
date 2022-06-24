import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DarkModeService } from '../services/darkMode.service';
import { LanguageService } from '../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  darkMode = false
  hidePassword = true

  
  private darkModeToggleSubscription: Subscription

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private darkModeService: DarkModeService,
    private languageService: LanguageService
    ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnInit(): void {
    this.loadInitialData()
    this.subscribeToEvents()
  }
  
  ngOnDestroy(){
    this.unsubscribeFromEvents()
  }
  loadInitialData(){
    this.darkMode = this.darkModeService.getDarkModeValue()
  }
  subscribeToEvents(){
   this.darkModeToggleSubscription = this.darkModeService.darkModeToggleEvent
        .subscribe(darkModeValue=> this.darkMode = darkModeValue )
  }

  unsubscribeFromEvents(){
    this.darkModeToggleSubscription.unsubscribe()
  }
  
  async submitForm(){

    const loginResponse = await this.loginService.requestLogin(this.loginForm.value).toPromise()    
      
      if(loginResponse['status']==="Wrong credentials"){
        this.loginForm.controls["username"].setErrors({wrongCredentials: true})
        this.loginForm.controls["password"].setErrors({wrongCredentials: true})
        this.clearForm()
      }else if(loginResponse['status']==="Wrong password"){
        this.loginForm.controls["password"].setErrors({wrongPassword: true})
      }else if(loginResponse['status']==="Login succesfull"){
        //Set token
        window.localStorage.setItem('token', loginResponse['token'])
        // Go to user
        this.router.navigate(['main'])
      }

    
  }

  clearForm(){
    setTimeout(()=>{
      this.loginForm.controls["username"].setValue("")
      this.loginForm.controls["password"].setValue("")
      this.loginForm.controls["username"].markAsUntouched({onlySelf:true})
      this.loginForm.controls["password"].markAsUntouched({onlySelf:true})
    },2000)
  }

  setLanguage(language){
    this.languageService.setLanguage(language)
  }
  toggleDarkMode(){
    this.darkModeService.toggleDarkMode()
  }





}
