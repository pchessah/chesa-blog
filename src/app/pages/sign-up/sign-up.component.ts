import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms"
import { IUsers } from 'src/app/libs/interfaces/iusers';
import { AuthService } from 'src/app/libs/services/auth_service/auth.service';
import { UserService } from 'src/app/libs/services/user-service/user.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm = this.fb.group({
    firstName: ["", Validators.required],
    secondName: ["", Validators.required],
    password: ["", Validators.required],
    confirmPassword: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]]
  });
  user: IUsers;

  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
  }

  signUp(): void {
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    const firstName = this.signUpForm.value.firstName;
    const secondName = this.signUpForm.value.secondName;
    const uid = uuidv4();
    const displayName = `${firstName} ${secondName}`
    
    this.user = {
      firstName: firstName,
      secondName: secondName,
      email: email,
      uid: uid
    }

    this.authService.signUp(email, password, displayName);
    //this.userService.addNewUser( this.user );
  }

  signUpWithGoogle(): void{
    this.authService.loginViaGoogle();
  }
}
