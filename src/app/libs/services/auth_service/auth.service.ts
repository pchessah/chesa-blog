import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IUsers } from '../../interfaces/iusers';
import { auth } from 'firebase/app';
import { User } from "firebase"

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<IUsers>;

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore,) { }

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






}