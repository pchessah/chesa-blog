import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms"
import { AuthService } from 'src/app/libs/services/auth_service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  
  signUpForm = this.fb.group({
    firstName:["", Validators.required],
    secondName:["", Validators.required],
    password:["", Validators.required],
    confirmPassword:["",[Validators.required]],
    email:["",[Validators.required, Validators.email]]
  })
  constructor( private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
  }

  signUp():void{
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
  
  }
}
