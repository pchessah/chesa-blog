import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IBlogPost } from 'src/app/libs/interfaces/iblogposts';
import { BlogsService } from 'src/app/libs/services/blog-service/blogs.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  displayedColumns: string[] = ['title', 'content', 'actions'];
  dataSource;
  blogPosts: Observable<IBlogPost[]>;
  blogPostsArray: IBlogPost[];



  constructor(private blogService: BlogsService, private router: Router) { }

  ngOnInit(): void {
    this.blogPosts = this.blogService.getAllPosts().valueChanges()
    this.blogPosts.subscribe(blogPosts => {
      this.blogPostsArray = blogPosts;
      this.dataSource = this.blogPostsArray;
    })

  }

  deleteSingleBlogPost(id) {
    if (confirm("Are you sure you want to delete this?")) {
      this.blogService.deleteSinglePost(id)
    } else {

    }
    this.blogService.deleteSinglePost(id);
  }

}
