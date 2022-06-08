import {  Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }


  setLanguage(language){
    console.log(language)
    localStorage.setItem('lang', language)
  }
}
