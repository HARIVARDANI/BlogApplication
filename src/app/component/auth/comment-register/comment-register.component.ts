import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-comment-register',
  imports: [FormsModule,NgIf],
  templateUrl: './comment-register.component.html',
  styleUrl: './comment-register.component.css'
})
export class CommentRegisterComponent {

  email = '';
  name = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  
  constructor(private userService: UserService, private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const newUser = {
      email: this.email,
      name: this.name,
      password: this.password,
      role:'user',
    };

    this.userService.register(newUser).subscribe(
      (response) => {
        alert('Registration successful!');
        localStorage.setItem('email', response.email);
        localStorage.setItem('userId', response.id);
        localStorage.setItem('role', response.role);
        this.router.navigate(['/blog-detail', response.blogId]);
      },
    );
  }

  cancel() {
    this.router.navigate(['/']);
  }

}
