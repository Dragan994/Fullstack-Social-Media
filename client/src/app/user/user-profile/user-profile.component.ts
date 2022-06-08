import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DarkModeService } from 'src/app/services/darkMode.service';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public user_id
  public userData
  public user_image_url
  public selectedView = {
    posts: true,
    info: false,
    photos: false,
    friends: false
  }
  
   darkMode= true
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private imageService: ImageService,
    private darkModeService: DarkModeService
  ) { }

  ngOnInit(): void {
    this.user_id = this.route.snapshot.queryParams.id
    this.userService.getUserProfileData(this.user_id).subscribe(res=>{
      console.log(res)
      this.userData = res
      this.user_image_url = this.imageService.getImagePath(this.userData['image_url'], "mid")
    })
    this.darkMode = this.darkModeService.getDarkModeValue()
    this.darkModeService.darkModeToggleEvent.subscribe(res=>{
      console.log(res)
      this.darkMode = res
    })
  }


  selectView(component){
    const views = Object.keys(this.selectedView)

    views.forEach(view=>{
      console.log(view)
      this.selectedView[view] = false
    })

    this.selectedView[component] = true
  }

}
