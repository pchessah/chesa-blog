import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { IBlogPost } from 'src/app/libs/interfaces/iblogposts';
import { BlogsService } from 'src/app/libs/services/blog-service/blogs.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['title', 'content', 'actions'];
  dataSource;
  blogPosts: Observable<IBlogPost[]>;
  blogPostsArray: IBlogPost[];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private blogService: BlogsService) {this.blogPosts = this.blogService.getAllPosts().valueChanges()
    this.blogPosts.subscribe(blogPosts => {
      this.blogPostsArray = blogPosts;
      this.dataSource = this.blogPostsArray;     
    }) }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource?.paginator.firstPage();
    }
  }

}
