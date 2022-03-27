import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-snack-bar',
  templateUrl: './user-snack-bar.component.html',
  styleUrls: ['./user-snack-bar.component.scss']
})
export class UserSnackBarComponent implements OnInit {

  @Input() userData

  constructor() { }

  ngOnInit(): void {
    console.log('User snackbar inited')
  }

}
