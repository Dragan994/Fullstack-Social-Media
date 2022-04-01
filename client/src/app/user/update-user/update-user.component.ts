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
    this.darkMode = this.darkModeService.getDarkModeValue()
    this.darkModeService.darkModeToggleEvent.subscribe(newValue=>{this.darkMode = newValue});
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
        loginData: {
          username: this.userData['username'],
          password: this.userData['password']
        },
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

  




  onImageSelected(e){
    this.selectedUserImg = <File>e.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedUserImg)
    
    reader.onload = ()=> {
      const rawLog = reader.result;
      this.selectedUserImgSrc = rawLog
    };
  
  }

  uploadImage(){
    const fd = new FormData();
    fd.append('image', this.selectedUserImg, `img${this.userData.user_id}`)
    this.imageService.uploadImage(fd).subscribe((event) =>{
      if(event.type === HttpEventType.UploadProgress){
        const loadProgress = Math.round(event.loaded / event.total * 100)
        if(loadProgress === 100){
          this.imageIsUploaded = true
        }
        console.log(`Upload Progress: ${loadProgress}%`)
      }else if(event.type === HttpEventType.Response){
        this.imgBaseUrl = event.body['imgBaseUrl']
        const fullImgUrl = `${environment.apiUrl}image/${this.imgBaseUrl}-mid.jpg`
        console.log(fullImgUrl)
        setTimeout(()=>{this.selectedUserImgSrc =  fullImgUrl},200)
      }
    })
  }

  clearUserImage(){
    if(this.imageIsUploaded){
      this.deleteImage()
    }
    this.selectedUserImg = null
    this.selectedUserImgSrc = null
  }

  deleteImage(){
    if(this.selectedUserImgSrc){
      this.imageService.deleteImageByBaseUrl({imgBaseUrl: this.imgBaseUrl}).subscribe(res=>console.log(res))
    }
  }



}

