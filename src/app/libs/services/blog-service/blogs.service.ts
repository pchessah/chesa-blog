import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IBlogPost } from '../../interfaces/iblogposts';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor(private firestore: AngularFirestore) { }

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
   const blogPostRef = this.firestore.firestore.collection("blog-posts");
   const snapshot = await blogPostRef.where("uid", "==", id).get();
   return snapshot

  }
}
