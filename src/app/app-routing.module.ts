import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { NewBlogPostComponent } from './pages/blogs/new-blog-post/new-blog-post.component';
import { BlogPostComponent } from './pages/blogs/blog-post/blog-post.component';
import { EditBlogPostComponent } from './pages/blogs/edit-blog-post/edit-blog-post.component';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["home"]);
const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "log-in", component: LogInComponent },
  { path: "sign-up", component: SignUpComponent },
  {
    path: "profile", component: ProfileComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "new-blogpost", component: NewBlogPostComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "edit-blogpost/:id", component: EditBlogPostComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  { path: "blogpost/:id", component: BlogPostComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
