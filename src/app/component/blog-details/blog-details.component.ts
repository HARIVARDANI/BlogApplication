import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../blog.service';
import { FilterService } from '../../filter.service';
import { RoleService } from '../../role.service';
import { UserService } from '../../user.service';
import { LoginComponent } from '../auth/login/login.component';
import { Blog } from '../blog.model';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-blog-details',
  imports: [DatePipe,NgIf,NgClass,NgFor,LoginComponent,FormsModule,LoginComponent,FooterComponent],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit{

  blog: Blog | null = null; 
  newComment: string = '';
  isLoginModalVisible: boolean = false;
 // comments: any[] = []; 
  tempEmail: string = '';
  registerRoute: string = '/register'; 
  loginContext: string = 'blog-details';

  constructor(private route:ActivatedRoute,private router:Router,private blogService:BlogService,   private userService: UserService,private roleService:RoleService,private filterService:FilterService){}
  
  ngOnInit(): void {
      const blogId = this.route.snapshot.paramMap.get('id');
      if(blogId){
        this.fetchBlogDetails(blogId);
      }

      this.filterService.loginModalVisible$.subscribe((isVisible) => {
        this.isLoginModalVisible = isVisible;
      });  
  }

fetchBlogDetails(id: string): void {
  this.blogService.getBlogById(id).subscribe({
    next: (data: Blog) => {
      console.log('Fetched the blog-detail', data);
      this.blog = data;
      if (!this.blog.likedBy) {
        this.blog.likedBy = [];
      }
      if (!this.blog.dislikedBy) {
        this.blog.dislikedBy = [];
      }
      if (!this.blog.comments) {
        this.blog.comments = []; 
      }
    },
    error: (error: any) => {
      console.error('Error fetching blog details:', error);
      alert('An error occurred while fetching the blog details. Please try again later.');
    },
  });
}

openLoginModal(context:string): void {
  this.loginContext = context;
  this.isLoginModalVisible = true; 
  this.filterService.toggleLoginModal(); 
}

closeLoginModal(): void {
  this.isLoginModalVisible = false; 
  this.filterService.setLoginModalVisibility(false);
}

goBack(): void {
  this.router.navigate(['/']);
}

addComment(): void {
  //localStorage.removeItem('email');
  const loggedInUser = localStorage.getItem('email');
  if (!loggedInUser) {
    //this.roleService.setRole('user');
    this.registerRoute = '/comment-register';
    this.isLoginModalVisible = true;
    return;
  }

  const comment = { user: loggedInUser, comment: this.newComment };
  if (this.blog) {
    this.blog.comments.push(comment);
    this.blogService.addComment(this.blog.id, this.blog).subscribe({
      next: (updatedBlog: Blog) => {
        this.blog = updatedBlog;
        this.newComment = '';
        alert('Comment added successfully!');
      },
      error: (error: any) => {
        console.error('Error adding comment:', error);
        alert('An error occurred while adding the comment. Please try again later.');
      },
    });
  }
}

likeBlog(): void {
  const loggedInUser = localStorage.getItem('email');
  if (!loggedInUser) {
    //this.roleService.setRole('user');
    this.registerRoute = '/like-register';
    this.isLoginModalVisible = true;
    return;
  }

  if (this.blog) {
    const likeIndex = this.blog.likedBy?.indexOf(loggedInUser);
    if (likeIndex !== -1) {
      this.blog.likedBy?.splice(likeIndex, 1);
      this.blog.likes = (this.blog.likes ?? 0) - 1;
    } else {
      const dislikeIndex = this.blog.dislikedBy?.indexOf(loggedInUser);
      if (dislikeIndex !== -1) {
        this.blog.dislikedBy?.splice(dislikeIndex, 1);
        this.blog.dislikes = (this.blog.dislikes ?? 0) - 1;
      }
      this.blog.likedBy?.push(loggedInUser);
      this.blog.likes = (this.blog.likes ?? 0) + 1;
    }

    this.updateBlog();
  }
}

dislikeBlog(): void {
  const loggedInUser = localStorage.getItem('email');
  if (!loggedInUser) {
    this.registerRoute = '/dislike-register';
    this.isLoginModalVisible = true;
    return;
  }

  if (this.blog) {
    const dislikeIndex = this.blog.dislikedBy?.indexOf(loggedInUser);
    if (dislikeIndex !== -1) {
      this.blog.dislikedBy?.splice(dislikeIndex, 1);
      this.blog.dislikes = (this.blog.dislikes ?? 0) - 1;
    } else {
      const likeIndex = this.blog.likedBy?.indexOf(loggedInUser);
      if (likeIndex !== -1) {
        this.blog.likedBy?.splice(likeIndex, 1);
        this.blog.likes = (this.blog.likes ?? 0) - 1;
      }
      this.blog.dislikedBy?.push(loggedInUser);
      this.blog.dislikes = (this.blog.dislikes ?? 0) + 1;
    }

    this.updateBlog();
  }
}


updateBlog(): void {
  if (this.blog) {
    this.blogService.updateBlog(this.blog.id, this.blog).subscribe({
      next: (updatedBlog: Blog) => {
        this.blog = updatedBlog;
      },
      error: (error: any) => {
        console.error('Error updating blog:', error);
        alert('An error occurred while updating the blog. Please try again later.');
      },
    });
  }
}

onLoginSuccess(email: string): void {
  this.tempEmail = email; 
  this.isLoginModalVisible = false;
  this.filterService.setLoginModalVisibility(false);
  if (this.blog) {
    switch (this.registerRoute) {
      case '/comment-register':
        const comment = { user: this.tempEmail, comment: this.newComment };
        this.blog.comments.push(comment);
        this.blogService.addComment(this.blog.id, this.blog).subscribe({
          next: (updatedBlog: Blog) => {
            this.blog = updatedBlog; 
            this.newComment = '';
            this.isLoginModalVisible = false;
            alert('Comment added successfully!');
          },
          error: (error: any) => {
            console.error('Error adding comment:', error);
            alert('An error occurred while adding the comment. Please try again later.');
          },
        });
        break;

      case '/like-register':
        const dislikeIndex = this.blog.dislikedBy?.indexOf(this.tempEmail);
        if (dislikeIndex !== -1) {
          this.blog.dislikedBy?.splice(dislikeIndex, 1); 
          this.blog.dislikes = (this.blog.dislikes ?? 0) - 1; 
        }

        const likeIndex = this.blog.likedBy?.indexOf(this.tempEmail);
        if (likeIndex === -1) {
          this.blog.likedBy?.push(this.tempEmail); 
          this.blog.likes = (this.blog.likes ?? 0) + 1; 
        }

        this.updateBlog(); 
        this.isLoginModalVisible = false; 
        alert('Liked the blog successfully!');
        break;

      case '/dislike-register':
        const likeIndexDislike = this.blog.likedBy?.indexOf(this.tempEmail);
        if (likeIndexDislike !== -1) {
          this.blog.likedBy?.splice(likeIndexDislike, 1); 
          this.blog.likes = (this.blog.likes ?? 0) - 1;
        }

        const dislikeIndexDislike = this.blog.dislikedBy?.indexOf(this.tempEmail);
        if (dislikeIndexDislike === -1) {
          this.blog.dislikedBy?.push(this.tempEmail);
          this.blog.dislikes = (this.blog.dislikes ?? 0) + 1; 
        }

        this.updateBlog(); 
        this.isLoginModalVisible = false; 
        alert('Disliked the blog successfully!');
        break;

      default:
        console.error('Unknown register route:', this.registerRoute);
        alert('An error occurred. Please try again later.');
    }
  }
}
 
}

//if this is error then will get the error while executing the commands and the compilor will not compile thus it will lead to run-time execution error as well as compile-time execution error.
