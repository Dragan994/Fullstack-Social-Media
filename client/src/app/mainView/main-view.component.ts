import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RequestPasswordComponent } from '../dialogs/request-password/request-password.component';
import { DarkModeService } from '../services/darkMode.service';
import { SocketService } from '../services/socket.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  darkMode= false
  mobileBrowser = false
  updateUser = false
  userData = null
  tokenError = true
  retrivedData;

  constructor(
    private userService: UserService,
    private router : Router,
    private socketService: SocketService,
    private darkModeService: DarkModeService
  ) { }

  ngOnInit(): void {
      this.userService.getUserData().subscribe(res=>{
        console.log(res)
        if(res['message'] === 'Access granted'){
          this.tokenError = false
          this.userData = {...res['data']}
        }
      })
      this.darkModeService.darkModeToggleEvent.subscribe(res=>{
        console.log(res)
        this.darkMode = res
      })
      
      this.darkMode = this.darkModeService.getDarkModeValue()
  }


  

  

  disapleUpdateUser(){
    this.updateUser = false
  }

  
  setDarkModeValue(){
    const darkModeVal = localStorage.getItem('darkMode')
    if(darkModeVal){
      this.darkMode = JSON.parse(darkModeVal)
    }
  }
  

}
