import { HttpResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FollowService } from 'src/app/services/follow/follow.service';


// declaring a view type for icon or text
type View = 'iconView' | 'textView'

// userId: the logged in user id
// followedUserId: the id of user the logged in user is going to follow
// followedUsername: the username of user the logged in user is going to follow
type FollowSubject = { 
  loggedInUserId: string, 
  followedUserId: string, 
  followedUsername: string
}

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css'],
})
export class FollowComponent {
  constructor(private followService: FollowService) {}

  // assign the view type to display
  @Input() viewTemplate!: View;

  // for post type instance
  // implementor will need to create an object with fields matching the FollowSubject type
  @Input() followIdentity!: FollowSubject;

  // boolean variable used for toggling follow and unfollow actions
  isFollowing: boolean = false;

  hasFollowError: boolean = false;
  errorMessage: string = '';

  // follow handler for follow and unfollow actions
  followHandler(followSubject: FollowSubject): void {
    this.hasFollowError = false;
    this.errorMessage = '';

    // if not following, handle follow request
    if (!this.isFollowing) {

      // this.followService.httpFollow("phouFollower001").subscribe({      
      this.followService.httpFollow(followSubject.followedUsername).subscribe({
        next: (res: HttpResponse<any>) => {
          console.log("following ...")
          this.isFollowing = true;
        },
        error: (err) => {
          // todo add failure message notification when placement is more clear
          this.errorMessage = err.error.message;
          this.hasFollowError = !this.hasFollowError;
        },
        complete: () => null
      });
    } 
    // if following, handle unfollow request
    else if (this.isFollowing && !this.hasFollowError) {
      
      // this.followService.httpUnfollow("phouFollower001").subscribe({
      this.followService.httpUnfollow(followSubject.followedUsername).subscribe({
        next: (res: HttpResponse<any>) => {
          console.log("unfollowing ...")
          this.isFollowing = false;
        },
        error: (err) => {
          // todo add failure message notification when placement is more clear
          this.errorMessage = err.error.message;
          this.hasFollowError = !this.hasFollowError;
          console.log(err.error.message)
        },
        complete: () => null
      });
    }
    // this.isFollowing = !this.isFollowing;
  }

}
