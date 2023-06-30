import { Component } from '@angular/core';
import {ProfilePayload} from "../../models/profile-payload";
import {TagPayload} from "../../models/tag-payload";
import {ProfileService} from "../../services/profile-service";
import {FormControl, FormGroup} from "@angular/forms";
import {BioPayload} from "../../models/bio-payload";
import {PostService} from "../../services/post/post.service";
import {PostRes} from "../../models/post/post";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profile!: ProfilePayload;
  modifyBio: boolean = false;
  posts!: Array<PostRes>;

  //utilize file upload service
  files: File[] = [];
  isImage: boolean = false;
  shortLink: string | null = null;


  // bio form
  changeBioForm = new FormGroup({
    bio: new FormControl(null)
  })

  tags: TagPayload[] = [];

  constructor(private profileService: ProfileService,
              private postService: PostService) { }

  // Retrieve profile information
  ngOnInit () {

    this.profileService.getUserTest().subscribe( {

      next: (resp: any) => {
        this.profile = resp;
        console.log(this.profile);
      },
      error: (err) => {
        console.error("Issue with retrieving profile details");
        console.log(err);
      }
    })
    this.ngAfterInit();
  }

  // boolean toggle for modifying bio
  modifyProfileBio() {

    if (this.modifyBio == false) {
      this.modifyBio = true;
    } else {
      this.modifyBio = false;
    }
    console.log("toggle modifying bio to: " + this.modifyBio)
  }

  submitForm(): void {
    if (!this.changeBioForm.valid) {
      console.log("bio form not set")
    }

    const payload: BioPayload = {
      bio: this.changeBioForm.controls.bio.value!
    }
    this.profile.bio = payload.bio;
    console.log("New bio is: " + payload.bio);

  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    if (this.files.length > 1) {
      this.files.splice(0, 1);
    }
    this.setImageAndVideoFlags();
  }

  setImageAndVideoFlags() {
    if (this.files.length == 1) {
      const file = this.files[0];
      const fileType = file['type'];
      const imageRegEx = /image/;
      this.isImage = imageRegEx.test(fileType);
    } else {
      this.isImage = false;
    }
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.setImageAndVideoFlags();
    this.shortLink = null;
  }

  // run this after initial data gather: use if dependent on get profiles

  ngAfterInit() {

    this.postService.getPosts().subscribe({
      next: (res) => {
        this.posts = res;
        console.log("Posts hit on profile: " + res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
