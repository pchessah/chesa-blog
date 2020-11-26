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
    private snackBar: MatSnackBar) {
      this.getBlogPost();
     }

  ngOnInit(): void {
    this.getBlogPost();
    this.editBlogPostForm = this.fb.group({
      title: [this.blogPost?.title, Validators.required],
      content: [this.blogPost?.content, Validators.required],
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
      this.editBlogPostForm.setValue({
        title: this.editBlogPostForm.get("title").value,
        content: this.editBlogPostForm.get("content").value,
      })

    const data = {
      uid: this.blogPost.uid,
      title: this.editBlogPostForm.get("title").value,
      content: this.editBlogPostForm.get("content").value,
    }
    debugger;

    this.snackBar.open(`${this.blogPost.title} changes saved`, 'Close', {
      duration: 4000,
    })
    this.blogService.updateSinglePost( this.blogPost.uid, data); 
  }

  cancel(): void {
    this.blogService.goBack();
  }

}
