import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms"

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
  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  signUp():void{
    console.log(this.signUpForm.value);
  }

}
