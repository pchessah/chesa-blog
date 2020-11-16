import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IBlogPost } from 'src/app/libs/interfaces/iblogposts';
import { AuthService } from 'src/app/libs/services/auth_service/auth.service';
import { BlogsService } from 'src/app/libs/services/blog-service/blogs.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-new-blog-post',
  templateUrl: './new-blog-post.component.html',
  styleUrls: ['./new-blog-post.component.scss']
})
export class NewBlogPostComponent implements OnInit {

  newBlogPostForm: any;
  newBlogPost: IBlogPost;
  user$: Observable<firebase.User> = this.authService.user$;
  author: string;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private blogService: BlogsService,
    private snackBar: MatSnackBar) {
    this.newBlogPostForm = this.fb.group({
      title: ["", Validators.required],
      content: ["", Validators.required],
      author: [""],
      uid: [""],
      dateOfCreation: [""]
    })
  }

  saveNewPost(): void {
    this.user$.subscribe(item => {
      this.author = item.displayName;

      let currentdate = new Date();
      const dateOfCreation = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

      const uid = uuidv4();
      const title = this.newBlogPostForm.value.title;
      const content = this.newBlogPostForm.value.content;
     
      this.newBlogPost = {
        uid: uid,
        title: title,
        content: content,
        dateOfCreation: dateOfCreation,
        author: this.author
      }

      this.snackBar.open(`${this.newBlogPost.title} saved`, 'Close', {
        duration: 4000,
      })
      this.blogService.addNewBlogPost(this.newBlogPost);
      this.router.navigateByUrl("/profile")
    })
  }

  cancel(): void {
    this.router.navigateByUrl("/profile")

  }

  ngOnInit(): void {
  }

}
