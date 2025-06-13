import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FilterService } from '../../../filter.service';
import { RoleService } from '../../../role.service';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule,NgIf,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  email = ''; 
  password = ''; 
  errorMessage = ''; 
  isLoginModalVisible = true;
 
  @Input() registerRoute: string = '/register'; 
  @Input() loginContext: string = 'navbar'; 
  @Output() closeModal = new EventEmitter<void>();
  @Output() loginSuccess = new EventEmitter<string>(); 

  constructor(private userService: UserService, private router: Router, private roleService: RoleService,private filterService:FilterService){}

  closeLoginModal() {
    this.closeModal.emit(); 
  }

  login(): void { 
    this.userService.login(this.email, this.password).subscribe( 
      (response: any[]) => { 
        const user = response.find( 
          (u) => u.email === this.email && u.password === this.password 
        ); 
  
         if (user) { 
        alert('Login successful!'); 
        this.roleService.setRole(user.role); 
        localStorage.setItem('email', user.email);  

        if (this.loginContext === 'navbar' && user.role === 'author') { 
          this.closeLoginModal();
          this.filterService.setLoginModalVisibility(false);
          this.router.navigate(['/dashboard']); 
        } else { 
          this.loginSuccess.emit(user.email); 
          this.closeLoginModal(); 
        } 
      }else { 
        this.errorMessage = 'Invalid email or password.'; 
      } 
    }
  ); 
}
}