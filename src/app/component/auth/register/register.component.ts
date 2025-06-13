import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  email = '';
  name='';
  password = '';
  confirmPassword = '';
  phoneNumber = '';
  errorMessage = '';

  constructor(private userService: UserService, private router: Router) {}

  register() {
   
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const newUser = {
      email: this.email,
      name:this.name,
      password: this.password,
      phoneNumber: this.phoneNumber,
      role:'author',
    };
 
    this.userService.register(newUser).subscribe(
      (response)=> {
        alert('Registration successful!');
        localStorage.setItem('email',response.email);
        localStorage.setItem('userId',response.id);
        localStorage.setItem('role',response.role);
        console.log('Email stored in localStorage:', localStorage.getItem('email'));
        console.log('Id stored in localStorage:', localStorage.getItem('userId'));
        this.router.navigate(['/dashboard']);
      },
    );
  }

  cancel() {
    this.router.navigate([""]);
  }

}

function cancel() {
  throw new Error('Function not implemented.');
}

