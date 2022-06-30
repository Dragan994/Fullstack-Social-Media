import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DarkModeService } from 'src/app/services/darkMode.service';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from '../user.service';
import { FriendshipService } from 'src/app/services/friendship.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public userData
  public profileUser_id
  public profileUserData
  public user_image_url
  public userOwnsProfile = false
  public friendshipStatus
  public friendshipData = null
  public friendshipOptions
  public selectedView = {
    posts: false,
    info: false,
    photos: true,
    friends: false
  }
  
   darkMode= true
   darkModeToggleSubscription: Subscription
   imageUpdateSubscription: Subscription
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private imageService: ImageService,
    private darkModeService: DarkModeService,
    private friendshipService: FriendshipService
  ) { }

  ngOnInit(): void {
    this.loadInitialData()
    this.subscribeToEvents()
  }

  ngOnDestroy(): void{
    this.unsubscribeFromEvents()
  }
  

  


  async loadInitialData(){
    this.profileUser_id = this.route.snapshot.queryParams.id
    this.darkMode = this.darkModeService.getDarkModeValue()
    
    const userDataPromise = this.userService.getUserData().toPromise()
    const profileUserDataPromise =  this.userService.getUserProfileData(this.profileUser_id).toPromise()

    const mainLoader = await Promise.all([userDataPromise, profileUserDataPromise])
    const userData = mainLoader[0]
    const profileUserData = mainLoader[1]
    console.log(mainLoader)

    
    if(userData['message'] === 'Access granted'){
      this.userData = userData['data']
    }
    this.profileUserData = mainLoader[1]
    if(this.userData.user_id === this.profileUserData.user_id){
      this.userOwnsProfile = true
    }    

    const profilePictureData = await this.imageService.getUserProfilePicture(profileUserData['user_id']).toPromise()
    if(profilePictureData['message'] === "image_url not found"){
      this.user_image_url = this.imageService.setDefaultProfilePicture()
    }else{
      this.user_image_url = this.imageService.getImagePath(profilePictureData['image_url'],"big")
    }
    

    this.updateFriendshipData()

    

  }
  
  subscribeToEvents(){      
    this.darkModeToggleSubscription = this.darkModeService.darkModeToggleEvent
        .subscribe(darkModeValue=>{this.darkMode = darkModeValue});

        this.imageUpdateSubscription =  this.imageService.updateImageEvent
        .subscribe( event => {
          if(event['name'] === "profile_picture_update"){
            this.updateUserProfilePicture(event.data)
          }
        })    
  }

  unsubscribeFromEvents(){
    this.darkModeToggleSubscription.unsubscribe()
    this.imageUpdateSubscription.unsubscribe()
  }

  selectView(component){
    const views = Object.keys(this.selectedView)
    views.forEach( view => this.selectedView[view] = false )
    this.selectedView[component] = true
  }


  updateUserProfilePicture(image_url){
    this.user_image_url = image_url
  }

 

  async sendFriendRequest(){
    console.log("Sending friend request...")
    const requester_id = this.userData.user_id
    const adressee_id = this.profileUserData.user_id
    const friendshipRequestResponse = await this.friendshipService.sendFriendRequest(requester_id,adressee_id).toPromise()
    console.log(friendshipRequestResponse)
    this.updateFriendshipData()
  }


  async acceptFriendship(){
    const friendship_id = this.friendshipData['friendship_id']
    const response = await this.friendshipService.acceptFriendship(friendship_id).toPromise()
    console.log(response)
    this.updateFriendshipData()
  }

  async cancelFriendship(){
    const friendship_id = this.friendshipData['friendship_id']
    const response = await this.friendshipService.cancelFriendship(friendship_id).toPromise()
    console.log(this.friendshipData)
    console.log(response)
    this.updateFriendshipData()
  }

  async blockUser(){
    // If no friendshipData server will create new friendship relation for block 
    // After requester unblocks addressee friendship will be deleted 
    let friendship_id = null
    if(this.friendshipData){
       friendship_id = this.friendshipData['friendship_id']?this.friendshipData['friendship_id']: "rocky"
    }
    const requester_id = this.userData['user_id']
    const addressee_id = this.profileUserData['user_id']

      const response = await this.friendshipService.blockUser(friendship_id, requester_id, addressee_id).toPromise()
      console.log(response)
   
      this.updateFriendshipData()
  }

  async unblockUser(){
    const friendship_id = this.friendshipData['friendship_id']
    const friendship_status = this.friendshipData['status']
    const response = await this.friendshipService.unblockUser(friendship_id, friendship_status).toPromise()
    console.log(response)    
    this.updateFriendshipData()
  }


  async updateFriendshipData(){
    if(!this.userOwnsProfile){
      this.friendshipData =  await this.friendshipService.getFriendshipData( this.userData['user_id'], this.profileUserData['user_id'] ).toPromise()
      
      if(!this.friendshipData){
        this.friendshipStatus = null
        return
      }
   
      if(this.friendshipData['fk_blocked_by'] === this.userData['user_id']){
        this.friendshipStatus = 'blocked'
        return
      }
      
   
       if(this.friendshipData['status'] === 'pending'){
         if(this.userData['user_id'] === this.friendshipData['fk_requester_id']){
           this.friendshipStatus = `${this.friendshipData['status']}-sent`
         }else{
           this.friendshipStatus = `${this.friendshipData['status']}-recieved`
         }
       }else if(this.friendshipData['status'] === 'accepted'){
         this.friendshipStatus = this.friendshipData['status']
       }else if(this.friendshipData['status'] === 'blocked'){
        this.friendshipStatus = this.friendshipData['status']
       }
     }
  }


}
