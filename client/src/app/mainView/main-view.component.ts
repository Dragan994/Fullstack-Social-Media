import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../services/darkMode.service';
import { UserService } from '../user/user.service';
import { mobileDetect } from 'src/utils/mobileDetect';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  public darkMode: Boolean = false
  public mobileBrowser: Boolean = mobileDetect()
  public tokenError: Boolean = true
  public userData = null

  private darkModeToggleSubscription: Subscription

  constructor(
    private userService: UserService,
    private darkModeService: DarkModeService
  ) { }

  ngOnInit(): void {
    this.loadInitialData()
    this.subscribeToEvents()
  }   
  ngOnDestroy():void {
    this.unsubscribeFromEvents()
  }
  
  async loadInitialData(){    
    const userDataResponse = await this.userService.getUserData().toPromise()    
    if(userDataResponse['message'] === 'Access granted'){
      this.userData = userDataResponse['data']
      this.tokenError = false
    }
    this.darkMode = this.darkModeService.getDarkModeValue()
  }

    subscribeToEvents(){
      this.darkModeToggleSubscription = this.darkModeService.darkModeToggleEvent
        .subscribe( darkModeValue => this.darkMode = darkModeValue )
        
    }
    unsubscribeFromEvents(){
      this.darkModeToggleSubscription.unsubscribe()
    }
    
  }