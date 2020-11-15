import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase/app';

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
    private router: Router,) {
    this.user.next(this.afAuth.authState)
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
      .then(() => {
        window.alert("Successfuly logged in!");
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