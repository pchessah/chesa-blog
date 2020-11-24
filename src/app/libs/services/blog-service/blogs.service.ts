import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IBlogPost } from '../../interfaces/iblogposts';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  
  blogPostRef = this.firestore.firestore.collection("blog-posts");
  constructor(private firestore: AngularFirestore, private location: Location) { }

  //GO BACK TO LAST SCREEN
  goBack(): void{
    this.location.back();
  }

  //CHECK ERRORS WITH HTTP CALLS
  handleError(err: HttpErrorResponse) {
    let errorMessage = "";
    //check if error is on the client side
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`
    } else {
      //else error is server side
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }


  //ADD NEW BLOG POST TO FIREBASE
  addNewBlogPost(post: IBlogPost) {
    return this.firestore.collection("blog-posts").add(post);
  }

  //GET ALL BLOG POSTS
  getAllPosts(): AngularFirestoreCollection<IBlogPost> {
    return this.firestore.collection("blog-posts")
  }

  //GET SINGLE BLOG POST VIA ID
  async getSinglePost(id: string) {  
   const snapshot = await this.blogPostRef.where("uid", "==", id).get();
   return snapshot;
  }

  //EDIT BLOGPOST
  updateSinglePost(id:string, data: any){
    this.blogPostRef.where("uid", "==", id).get().then((snapshots) => {
      snapshots.forEach((doc) => doc.ref.update(data))
    })
  }

}
