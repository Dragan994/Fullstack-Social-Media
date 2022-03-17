import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RequestPasswordComponent } from '../dialogs/request-password/request-password.component';
import { SocketService } from '../services/socket.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  updateUser = false
  userData = null
  tokenError = true
  retrivedData;

  constructor(
    private userService: UserService,
    private router : Router,
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token')
   
      this.userService.getUserData().subscribe(res=>{
        if(res['message'] === 'Access granted'){
          this.tokenError = false
          this.userData = {...res['data']}
        }
      })
    
    // Listen for event


  }

  logOut(){
    window.localStorage.removeItem('token')
    this.router.navigate(['login'])
    console.log(this.userData)
    this.socketService.emitUserDisconnection()
  }

  enableCrudUser(){
    this.updateUser = !this.updateUser
  }

  disapleUpdateUser(){
    this.updateUser = false
  }


  

}
