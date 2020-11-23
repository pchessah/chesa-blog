import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBlogPost } from 'src/app/libs/interfaces/iblogposts';
import { BlogsService } from 'src/app/libs/services/blog-service/blogs.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  blogPost: IBlogPost;

  constructor(private router: Router,
    private blogService: BlogsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBlogPost();
  }

  getBlogPost(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.blogService.getSinglePost(id).subscribe((blogPost: IBlogPost) => {
      this.blogPost = blogPost;
      console.log(id);
    })
  }

}
