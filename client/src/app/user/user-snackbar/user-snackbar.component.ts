import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-user-snackbar',
  templateUrl: './user-snackbar.component.html',
  styleUrls: ['./user-snackbar.component.scss']
})
export class UserSnackbarComponent implements OnInit {
  
  @Input() userData
  public user_image_url
  constructor(
    private imageService: ImageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user_image_url = this.imageService.getImagePath(this.userData['image_url'], "small")
    console.log(this.userData)
  }

  

  goToUserProfile(){
    const user_id = this.userData.user_id
    this.router.navigate(['/userProfile'], {queryParams:{id: user_id}})
  }

  }
