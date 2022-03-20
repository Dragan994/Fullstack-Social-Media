import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RequestPasswordComponent } from 'src/app/dialogs/request-password/request-password.component';
import { ConfirmedValidator } from 'src/utils/ConfirmedValidator';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})

export class UpdateUserComponent implements OnInit, OnChanges {

  @Output() cancelUpdateEvent = new EventEmitter()
  @Input() userData
  updateUserForm: FormGroup
  updatePasswordIsVisible = false

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder
  ) { this.updateUserForm = this.fb.group({
      
    firstname: ['', [Validators.required, Validators.minLength(3)]],
    lastname: ['', [Validators.required, Validators.minLength(3)]],
    
    email: [{value: 'someValue', disabled:true}],
    username: [{value: 'someValue', disabled:true}],

    changePassword: false,

    newPassword: [{value: '', disabled:true}, [Validators.required, Validators.minLength(6)]],      
    confirmNewPassword: [{value: '', disabled:true}, [Validators.required, Validators.minLength(6)]],
  },{
    validator: ConfirmedValidator('newPassword', 'confirmNewPassword')
  }
  )}

  ngOnInit(): void {
    this.updateUserForm.controls['changePassword'].valueChanges.subscribe((userChangingPassword) => {
      this.updatePasswordIsVisible = userChangingPassword
      if(userChangingPassword){
        this.updateUserForm.controls['newPassword'].enable()
        this.updateUserForm.controls['confirmNewPassword'].enable()
      }else{        
        this.updateUserForm.controls['newPassword'].disable()
        this.updateUserForm.controls['confirmNewPassword'].disable()
      }
    })
  }

  ngOnChanges(){
    if(this.userData){
      this.fillForm(this.userData)
    }

  }




  updateUser(){
    if(this.updateUserForm.pristine){
      console.log("Leave it as it is")
      this.cancelUpdate()
    }else{
      console.log("open dialog")
      this.openRequestPasswordDialog()
    }
    
    console.log(this.updateUserForm)
  }

  cancelUpdate(){
    this.cancelUpdateEvent.emit()
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


}
