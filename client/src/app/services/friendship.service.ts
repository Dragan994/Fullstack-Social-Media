import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  constructor(
    private http: HttpClient
  ) { }



  getProfileFriends(profile_id){
    return this.http.post("/api/getProfileFriends", {profile_id})
  }


  sendFriendRequest(requester_id,adressee_id){
    return this.http.post('/api/sendFriendRequest',{requester_id,adressee_id})
  }

  

  getUserFriendList(user_id){
    return this.http.post('/api/getUserFriendList', {user_id})
  }

  getFriendshipData(user_id, visitedProfileUser_id){
    const data = {
      user_id,
       visitedProfileUser_id
    }
    return this.http.post('/api/getFriendshipStatus', data)
  }

  acceptFriendship(friendship_id){
    return this.http.post('/api/acceptFriendship',{friendship_id})
  }

  cancelFriendship(friendship_id){
    return this.http.post('/api/cancelFriendship', {friendship_id})

  }

  blockUser(friendship_id, requester_id, addressee_id){
    return this.http.post('/api/blockUser', {friendship_id,  requester_id, addressee_id})
  }

  unblockUser(friendship_id,friendship_status){
    return this.http.post('/api/unblockUser', {friendship_id,friendship_status})
  }

}
