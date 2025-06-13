import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { FilterService } from './filter.service';
import { RoleService } from './role.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,NgFor,NgIf,LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'blog-app';

  searchTerm: string = '';
  sortOrder: string = 'newToOld';
  itemsPerPage: number = 8;
  itemsPerPageOptions: number[] = [5,8,10, 15, 20];
  isBlogDetailsPage: boolean = false;
  isHomePage: boolean = false;

  isLoginModalVisible: boolean = false;
  loginContext: string = 'navbar';

  isLoggedIn: boolean = false; 
  loggedInUserEmail: string | null = null;

  constructor(private filterService: FilterService,private router: Router) {

    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.isBlogDetailsPage = currentRoute.includes('/blog-detail'); 
      this.isHomePage = currentRoute === '/' || currentRoute.includes('/blog-list'); 
      this.filterService.setLoginModalVisibility(false);
     
      const email = localStorage.getItem('email'); 
      this.isLoggedIn = !!email; 
      this.loggedInUserEmail = email; 
    });
  }

  onSearchTermChange(searchTerm: string): void {
    this.filterService.setSearchTerm(searchTerm);
  }

  onSortOrderChange(sortOrder: string): void {
    this.filterService.setSortOrder(sortOrder);
  }

  changeItemsPerPage(itemsPerPage: number): void {
    this.filterService.setItemsPerPage(itemsPerPage);
  }

  openLoginModal(context:string): void {
    this.loginContext = context;
    this.isLoginModalVisible = true;
    this.filterService.toggleLoginModal();
  }

   closeLoginModal(): void {
    this.isLoginModalVisible = false;
    this.filterService.toggleLoginModal();
  }
  
  onLoginSuccess(email: string): void {
    this.isLoggedIn = true; 
    this.loggedInUserEmail = email; 
    localStorage.setItem('email', email);
    console.log('Login successful:', email); 
    this.isLoginModalVisible = false; 
  }

  logout(): void {
    this.isLoggedIn = false;
    this.loggedInUserEmail = null; 
    localStorage.removeItem('email'); 
    this.router.navigate(['/']);
  }
  
}

