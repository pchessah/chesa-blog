import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router){ }

  signUp(email, password){
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        window.alert("You have been registered");
        console.log(result.user);        
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  signIn(email, password){
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        window.alert("Successfuly logged in!");
        this.router.navigateByUrl("/");        
      }).catch((error)=> {
        window.alert(error.message)
      })
  }

}