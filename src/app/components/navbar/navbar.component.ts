import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { catchError, take } from 'rxjs/operators';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/libs/services/auth_service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  navState: boolean = true;
  user$: Observable<firebase.User> = this.authService.user$;
  private user;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private authService: AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void{
   this.user$.subscribe((user)=>{
     console.log(user.email);
   })
  }

  logOut(): void{
    this.authService.logout();
  }

  iconChange(): void{
    this.navState = !this.navState;
  }

  

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }



}
