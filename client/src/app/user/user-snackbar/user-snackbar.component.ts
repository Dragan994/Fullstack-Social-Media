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
  @Input() profileUserData
  public user_image_url
  constructor(
    private imageService: ImageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadInitialData()

  }


  async loadInitialData(){
    const profilePictureData = await this.imageService.getUserProfilePicture(this.profileUserData['user_id']).toPromise()

    if(profilePictureData['message'] === "image_url not found"){
      this.user_image_url = this.imageService.setDefaultProfilePicture()
    }else{
      this.user_image_url = this.imageService.getImagePath(profilePictureData['image_url'],"big")
    }
  }
  


  goToUserProfile(){
    const profileUser_id = this.profileUserData['user_id']

    this.router.navigate(['userProfile'],{queryParams: {id:profileUser_id}})
    .then(()=>{ 
      // This ensures user to visit his own profile if he is on someone elses profile.
      
        window.location.reload()
      
    })
  }

  }
