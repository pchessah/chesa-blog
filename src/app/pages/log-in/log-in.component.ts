import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/libs/services/auth_service/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  logInForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required]
  })

  constructor(private fb: FormBuilder, private authService: AuthService) { }


  ngOnInit(): void {
  }

  logIn(): void{
   const email = (this.logInForm.value.email);
   const password = (this.logInForm.value.password);
   this.authService.signIn(email,password);
  }

}
