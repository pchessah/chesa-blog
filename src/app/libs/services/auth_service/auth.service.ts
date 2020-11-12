import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import 'firebase/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IUsers } from '../../interfaces/iusers';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<IUsers>;
  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore,) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<IUsers>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null)
        }
      })
    )
  }

  signUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        window.alert("You have been registered");
        this.router.navigateByUrl("/log-in")
        console.log(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  signIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        window.alert("Successfuly logged in!");
        this.router.navigateByUrl("/");
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);

  }



}