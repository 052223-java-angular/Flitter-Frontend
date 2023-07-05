import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostRes } from 'src/app/models/post/post';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private httpClient: HttpClient) { }

  
  followUser(id: string) : Observable<PostRes[]> {
    return this.httpClient.get<PostRes[]>("/assets/post.json");
  }

  unFollowUser(id: string) : Observable<PostRes[]> {
    return this.httpClient.get<PostRes[]>("/assets/post.json");
  }

  // this method is to report a post; reporting post should be a boolean
  reportPost(postId: string) : void {
    this.httpClient.post<void>('/post/report', postId)
  }

}
