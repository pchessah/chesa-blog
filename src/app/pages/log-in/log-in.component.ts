import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
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
  });

  user$: Observable<firebase.User> = this.authService.user$;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router) { }


  ngOnInit(): void {
  }

  logInViaMail(): void {
    const email = (this.logInForm.value.email);
    const password = (this.logInForm.value.password);    
    this.authService.signIn(email, password);

  }

  logInViaGoogle(): void {
    this.authService.loginViaGoogle()
      .pipe(take(1),
        catchError((error) => {
          this.snackBar.open(`${error.message}`, "Close", {
            duration: 4000,
          });
          return EMPTY;
        }))
      .subscribe((response) =>{
        response && this.snackBar.open(`Succesfully logged in`, 'Close', {
          duration: 4000,       
        })
        this.router.navigateByUrl("/");
      } );
  }

 

}
