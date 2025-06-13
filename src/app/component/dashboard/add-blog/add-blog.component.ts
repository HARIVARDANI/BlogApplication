import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { BlogService } from '../../../blog.service';
import { Blog } from '../../blog.model';
import { DashboardComponent } from '../dashboard.component';

@Component({
  selector: 'app-add-blog',
  imports: [DashboardComponent,RouterOutlet,FormsModule],
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css'],
})
export class AddBlogComponent implements OnInit {
  blog: Blog = {
    title: '',
    author: '',
    content: '',
    category: '',
    imageURLs: [],
    publicationDate: 0,
    likes: 0, 
    dislikes: 0, 
  };

  isEditMode: boolean = false;
  blogId: string | null = null;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

    const loggedInUser = localStorage.getItem('email'); 
    if (!loggedInUser) {
      alert('You must be logged in to access this page.');
      this.router.navigate(['/']);
      return;
    }
    
    this.activatedRoute.queryParams.subscribe((params) => {
      this.blogId = params['id'];
      if (this.blogId) {
        this.isEditMode = true;
        this.loadBlogForEditing(this.blogId);
      } else {
        this.blog.author = loggedInUser;
      }
    });
  }

  loadBlogForEditing(id: string): void {
    this.blogService.getBlogById(id).subscribe({
      next: (blog) => {
        this.blog = blog;
      },
      error: (err) => {
        console.error('Error fetching blog for editing:', err);
      },
    });
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
    
      for (let i = 0; i < files.length; i++) {
        const mockImageURL = `/${files[i].name}`; 
        this.blog.imageURLs.push(mockImageURL);
      }
    }
  }


  onSubmit(): void {
    if (this.isEditMode && this.blogId) {
      this.blogService.updateBlog(this.blogId, this.blog).subscribe({
        next: () => {
          alert('Blog updated successfully!');
          this.router.navigate(['/dashboard/my-works']);
        },
        error: (err) => {
          console.error('Error updating blog:', err);
          alert('Failed to update the blog. Please try again.');
        },
      });
    } else {
      // Add new blog
      this.blog.publicationDate = Date.now();
      this.blogService.addBlog(this.blog).subscribe({
        next: () => {
          alert('Blog added successfully!');
          this.router.navigate(['/dashboard/my-works']);
        },
        error: (err) => {
          console.error('Error adding blog:', err);
          alert('Failed to add the blog. Please try again.');
        },
      });
    }
  }
}
