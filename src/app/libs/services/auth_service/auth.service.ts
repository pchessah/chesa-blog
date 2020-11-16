import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase/app';
import firebase from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: BehaviorSubject<
    Observable<firebase.User>
  > = new BehaviorSubject<Observable<firebase.User>>(null);
  user$ = this.user
    .asObservable()
    .pipe(switchMap((user: Observable<firebase.User>) => user));

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private snackBar: MatSnackBar) {
    this.user.next(this.afAuth.authState)
  }

  signUp(email, password, displayName) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        window.alert("You have been registered");
        this.updateUserName(displayName)
        this.router.navigateByUrl("/log-in")
        console.log(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  updateUserName( displayName ){
    let user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: displayName,
    })
  }

  signIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigateByUrl("/");
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  loginViaGoogle(): Observable<auth.UserCredential> {
    return from(this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()));
  }

  logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }






}