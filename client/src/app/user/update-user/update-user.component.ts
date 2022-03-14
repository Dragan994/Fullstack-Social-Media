import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from 'src/utils/ConfirmedValidator';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})

export class UpdateUserComponent implements OnInit, OnChanges {

  @Output() cancelUpdateEvent = new EventEmitter()
  @Input() userData

  crudUserForm: FormGroup  

  constructor(
    private fb: FormBuilder
  ) { this.crudUserForm = this.fb.group({
      
    firstname: ['', [Validators.required, Validators.minLength(4)]],
    lastname: ['', [Validators.required, Validators.minLength(4)]],
    
    email: [{value: 'someValue', disabled:true}],
    username: [{value: 'someValue', disabled:true}],

    password: ['', [Validators.required, Validators.minLength(6)]],      
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  },{
    validator: ConfirmedValidator('password', 'confirmPassword')
  }
  )}

  ngOnInit(): void {
  }

  ngOnChanges(){
    if(this.userData){
      this.fillForm(this.userData)
    }    
  }




  updateUser(){
    console.log("User updated")
  }

  cancelUpdate(){
    console.log("Update canceled")
    this.cancelUpdateEvent.emit()
  }

  fillForm(userData){
    console.log(userData)
    this.crudUserForm.controls['firstname'].setValue(userData['firstname'])  
    this.crudUserForm.controls['lastname'].setValue(userData['lastname'])
    this.crudUserForm.controls['email'].setValue(userData['email'])
    this.crudUserForm.controls['username'].setValue(userData['username'])
  }

}
