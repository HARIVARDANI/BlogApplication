import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../../blog.service';
import { Blog } from '../../blog.model';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-my-works',
  imports: [NgIf, NgFor, DatePipe],
  templateUrl: './my-works.component.html',
  styleUrl: './my-works.component.css',
})
export class MyWorksComponent implements OnInit {
  blogs: Blog[] = [];
  author: string = ''; 

  constructor(
    private blogService: BlogService,
    private userService: UserService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setAuthor(); 
    this.fetchBlogs();
  }

  setAuthor(): void {
    this.userService.getLoggedInUser().subscribe({
      next: (user) => {
        if (user && user.id) {
          this.author = user.name;
          this.fetchBlogs(); 
        } else {
          console.error('No logged-in user found or user name is missing');
        }
      },
      error: (err) => {
        console.error('Error fetching logged-in user:', err);
      },
    });
  }

  fetchBlogs(): void {
    if (!this.author) {
      console.error('Author is not set. Cannot fetch blogs.');
      return;
    }

    this.blogService.getMyBlogs(this.author).subscribe({
      next: (blogs) => {
        this.blogs = blogs;
      },
      error: (err) => {
        console.error('Error fetching blogs:', err);
      },
    });
  }

  onEdit(blog: Blog): void {
    this.router.navigate(['/dashboard/add-blog'], { queryParams: { id: blog.id } });
  }
}
