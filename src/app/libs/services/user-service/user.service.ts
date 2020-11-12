import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUsers } from '../../interfaces/iusers';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

    //ADD NEW USER DETAILS TO FIREBASE
    addNewUser(user: IUsers ) {
      return this.firestore.collection("users").add(user);
    }
}
