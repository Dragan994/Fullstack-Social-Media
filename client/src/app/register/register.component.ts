import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmedValidator } from 'src/utils/ConfirmedValidator';
import { DarkModeService } from '../services/darkMode.service';
import { LanguageService } from '../services/language.service';
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
  hidePassword = true
  hideConfirmPassword = true

  darkModeToggleSubscription: Subscription

  constructor(
      private registerService: RegisterService,
      private fb: FormBuilder,
      private router: Router,
      private darkModeService: DarkModeService,
      private languageService: LanguageService
  ) {
    this.registerForm = this.fb.group({
      
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(4)]],

      password: ['', [Validators.required, Validators.minLength(6)]],      
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },{
      validator: ConfirmedValidator('password', 'confirmPassword')
    });
  }

  ngOnInit(): void {
    this.loadInitialData()
    this.subscribeToEvents()
  }
  ngOnDestroy(): void {
    this.unsubscribeFromEvents()
  }
  async loadInitialData(){
    this.darkMode = this.darkModeService.getDarkModeValue()
  }

  async submitForm(){
    const registerResponse = await this.registerService.requestRegistration(this.registerForm.value).toPromise()
   
    if(registerResponse['status'] === "User created succesfully."){
      this.router.navigate(["login"])
    } 
  }



  setLanguage(language){
    this.languageService.setLanguage(language)
  }
  toggleDarkMode(){
    this.darkModeService.toggleDarkMode()
  }


  subscribeToEvents(){
    this.darkModeToggleSubscription = this.darkModeService.darkModeToggleEvent
      .subscribe(darkmodeValue => this.darkMode = darkmodeValue );
  }

  unsubscribeFromEvents(){
    this.darkModeToggleSubscription.unsubscribe()
  }


}
