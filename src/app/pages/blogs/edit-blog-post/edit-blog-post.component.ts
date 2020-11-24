import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsService } from 'src/app/libs/services/blog-service/blogs.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-blog-post',
  templateUrl: './edit-blog-post.component.html',
  styleUrls: ['./edit-blog-post.component.scss']
})
export class EditBlogPostComponent implements OnInit {

  blogPost;
  editBlogPostForm: any;

  constructor(private router: Router,
    private blogService: BlogsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getBlogPost();
    this.editBlogPostForm = this.fb.group({
      title: [this.blogPost?.title, Validators.required],
      content: [this.blogPost?.content, Validators.required],
      dateOfCreation: [""]
    })
  }

  getBlogPost(): void {
    const id = this.route.snapshot.paramMap.get("id");
    (async () => {
      return (await this.blogService.getSinglePost(id)).forEach(doc => {
        this.blogPost = (doc.data());
      })
    })()
  }

  saveEditedPost(): void {
    let currentdate = new Date();
    const dateOfCreation = currentdate.getDate() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getFullYear() + " @ "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();

      this.editBlogPostForm.patchValue({
        title: this.editBlogPostForm.value.title,
        content: this.editBlogPostForm.value.content,
      })

    const data = {
      uid: this.blogPost.uid,
      title: this.editBlogPostForm.value.title,
      content: this.editBlogPostForm.value.content,
      dateOfCreation: dateOfCreation
    }

    this.snackBar.open(`${this.blogPost.title} changes saved`, 'Close', {
      duration: 4000,
    })
    this.blogService.updateSinglePost( this.blogPost.uid, data); 
  }

  cancel(): void {
    this.blogService.goBack();
  }

}
