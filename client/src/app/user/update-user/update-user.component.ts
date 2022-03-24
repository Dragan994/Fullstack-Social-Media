import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RequestPasswordComponent } from 'src/app/dialogs/request-password/request-password.component';
import { DarkModeService } from 'src/app/services/darkMode.service';
import { ConfirmedValidator } from 'src/utils/ConfirmedValidator';
import updateDarkMode from 'src/utils/darkModeUpdater';
import { UserService } from '../user.service';
import { UserDataInterface } from '../UserData.interface';



@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})

export class UpdateUserComponent implements OnInit {

  @Output() cancelUpdateEvent = new EventEmitter()
  updateUserForm: FormGroup
  updatePasswordIsVisible = false
  darkMode = false

  public userData: UserDataInterface


  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private userService: UserService,
    private darkModeService: DarkModeService,
    private route: Router
  ) {
    this.userService.getUserData().subscribe(res=>{
      console.log(res)
      if(res['message'] === 'Access granted'){
          this.userData = {...res['data']}
          this.fillForm(this.userData)
      }
    })



      this.updateUserForm = this.fb.group({
        
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      
      email: [{value: 'someValue', disabled:true}],
      username: [{value: 'someValue', disabled:true}],

      changePassword: false,

      newPassword: [{value: '', disabled:true}, [Validators.required, Validators.minLength(6)]],      
      confirmNewPassword: [{value: '', disabled:true}, [Validators.required, Validators.minLength(6)]],
    },{
      validator: ConfirmedValidator('newPassword', 'confirmNewPassword')
    })
  }

  ngOnInit(): void {
    this.subscribeToFormValueChange()
    this.darkModeService.darkModeToggleEvent.subscribe(res=>{
      this.darkMode = res
      console.log("NAVI")
      console.log(res)
    })

    this.setDarkModeValue()
  }





  updateUser(){
    if(this.updateUserForm.pristine){
      this.cancelUpdate()
    }else{
      console.log("open dialog")
      this.openRequestPasswordDialog()
    }
    
    console.log(this.updateUserForm)
  }

  cancelUpdate(){
    this.route.navigate(['main'])
  }

  fillForm(userData){
    console.log(userData)
    this.updateUserForm.controls['firstname'].setValue(userData['firstname'])  
    this.updateUserForm.controls['lastname'].setValue(userData['lastname'])
    this.updateUserForm.controls['email'].setValue(userData['email'])
    this.updateUserForm.controls['username'].setValue(userData['username'])
  }



  openRequestPasswordDialog(){
    const dialogRef = this.dialog.open(RequestPasswordComponent, {
      disableClose:true,
      data: {
        loginData: {
          username: this.userData['username'],
          password: this.userData['password']
        },
        updateUserData: {...this.updateUserForm.value}
      }
      
    });

    dialogRef.afterClosed().subscribe(res=>{
      console.log(res)
      console.log("Dialog closed")
    })

    console.log(this.userData)
  }


  subscribeToFormValueChange(){
    this.updateUserForm.controls['changePassword'].valueChanges.subscribe((userChangingPassword) => {

    this.updatePasswordIsVisible = userChangingPassword;

      if(userChangingPassword){
        this.updateUserForm.controls['newPassword'].enable();
        this.updateUserForm.controls['confirmNewPassword'].enable();
      }else{        
        this.updateUserForm.controls['newPassword'].disable();
        this.updateUserForm.controls['confirmNewPassword'].disable();
      }
    });
  }

  
  setDarkModeValue(){
    const darkModeVal = localStorage.getItem('darkMode')
    if(darkModeVal){
      this.darkMode = JSON.parse(darkModeVal)
    }
  }

}