import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RequestPasswordService } from './request-password.service';
@Component({
  selector: 'app-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss']
})
export class RequestPasswordComponent implements OnInit {
  darkMode= false
  validatePasswordForm: FormGroup

  constructor(
    private router: Router,
    private requestPasswordService: RequestPasswordService,
    public dialogRef: MatDialogRef<RequestPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private fb: FormBuilder) {
      this.validatePasswordForm = this.fb.group({
      
      password: ['', [Validators.required, Validators.minLength(6)]]
      })
    }

    ngOnInit(): void {
      if(localStorage.getItem('darkMode')==='true'){
        this.darkMode = true
      }else{
        this.darkMode = false
      }
    }


    validatePassword(){

      const pass = this.validatePasswordForm.value['password']
      if(pass === this.data['password']){
        
        this.sendUpdateUserRequest(this.data)
      }else{
        this.validatePasswordForm.controls['password'].setErrors({wrongPassword: true})
        setTimeout(()=>{
          this.validatePasswordForm.controls["password"].setValue("")
          this.validatePasswordForm.controls["password"].markAsUntouched({onlySelf:true})
        }, 2000)
      }

    }
    
    sendUpdateUserRequest(userData){
      this.requestPasswordService.requestUpdateUser(userData.user_id, userData.updateUserData).subscribe(res=>{
        
        if(res['status']=== "OK"){

          // Here we can fire event that requests userData so it can be refreshed after update.
          
          // This way user have to login again.

          console.log('closing dialog')
          this.dialogRef.close()
          localStorage.removeItem('token')
          this.router.navigate(['login'])
        }
        console.log("Server reply on userUpdate call:")
        console.log(res)
      })
    }

}
