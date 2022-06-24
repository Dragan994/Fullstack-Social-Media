import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RequestPasswordComponent } from 'src/app/dialogs/request-password/request-password.component';
import { DarkModeService } from 'src/app/services/darkMode.service';
import { ConfirmedValidator } from 'src/utils/ConfirmedValidator';
import { UserService } from '../user.service';
import { IUserData } from 'src/Interfaces/UserData.interface';
import { ImageService } from 'src/app/services/image.service';
import { environment } from 'src/environments/environment.prod';
import { HttpEventType } from '@angular/common/http';


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

  selectedUserImg: File = null
  selectedUserImgSrc
  imgBaseUrl: string
  imageIsUploaded: boolean = false

  public userData: IUserData
  readonly maxFileSize = 104857600;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private userService: UserService,
    private darkModeService: DarkModeService,
    private route: Router,
    private imageService: ImageService
  ) {
    



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

    this.loadInitialData()
    this.subscribeToFormValueChange()
    this.darkMode = this.darkModeService.getDarkModeValue()
    this.darkModeService.darkModeToggleEvent.subscribe(newValue=>{this.darkMode = newValue});
  }



  async loadInitialData(){

    const userData = await this.userService.getUserData().toPromise()
      if(userData['message'] === 'Access granted'){
          this.userData = {...userData['data']}
          this.fillForm(this.userData)
      }
    

  }



  updateUser(){
    if(this.updateUserForm.pristine){
      this.cancelUpdate()
    }else{
      this.openRequestPasswordDialog()
    }
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
    this.dialog.open(RequestPasswordComponent, {
      disableClose:true,
      data: {
        user_id:  this.userData['user_id'],
        password: this.userData['password'],
        updateUserData: {...this.updateUserForm.value}
      }
      
    });
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


}

