import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppFirebaseModule } from './libs/modules/app-firebase/app-firebase.module';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';


import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { NewBlogPostComponent } from './pages/blogs/new-blog-post/new-blog-post.component';
import { BlogPostComponent } from './pages/blogs/blog-post/blog-post.component';
import { EditBlogPostComponent } from './pages/blogs/edit-blog-post/edit-blog-post.component';

const MAT_MODULES = [
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatSnackBarModule,
  MatMenuModule,
  MatTableModule
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ProfileComponent,
    LogInComponent,
    SignUpComponent,
    NotFoundComponent,
    UserProfileComponent,
    NewBlogPostComponent,
    BlogPostComponent,
    EditBlogPostComponent
  ],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    AppFirebaseModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ...MAT_MODULES,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
