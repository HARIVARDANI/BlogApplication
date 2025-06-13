import { DatePipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AppComponent } from '../../app.component';
import { BlogService } from '../../blog.service';
import { FilterService } from '../../filter.service';
import { UserService } from '../../user.service';
import { LoginComponent } from '../auth/login/login.component';
import { Blog } from '../blog.model';
import { FooterComponent } from '../footer/footer.component';
//import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-blog-list',
  imports: [FormsModule,DatePipe,SlicePipe,NgFor,RouterLink,NgIf,LoginComponent,AppComponent,FooterComponent],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent implements OnInit{

  isLoginModalVisible = false;

  blogs: Blog[] = [];
  displayedBlogs: Blog[] = [];
  searchTerm: string = '';
  sortOrder: string = 'newToOld';
  currentPage: number = 1;
  itemsPerPage: number = 8; 
  totalPages: number[] = []; 


  constructor(private blogService: BlogService,private filterService: FilterService) {}

  ngOnInit(): void {
    this.loadBlogs();
  
  this.filterService.searchTerm$.subscribe((term) => {
    this.searchTerm = term;
    this.applyFilters();
  });

  this.filterService.sortOrder$.subscribe((order) => {
    this.sortOrder = order;
    this.applyFilters();
  });

  this.filterService.itemsPerPage$.subscribe((count) => {
    this.itemsPerPage = count;
    this.applyFilters();
  });

  this.filterService.loginModalVisible$.subscribe((isVisible) => {
    this.isLoginModalVisible = isVisible;
  });
}
 
  loadBlogs(): void {
    this.blogService.getBlogs().subscribe({
      next: (data) => {
        console.log('Fetched blogs', data);
        this.blogs = data;
        this.applyFilters();
        //this.calculateTotalPages();
      },
      error: (error) => {
        console.error('Error fetching blogs:', error);
        alert('An error occurred while fetching the blogs. Please try again later.'); 
      },
    });
  }

 openLoginModal(): void {
  this.isLoginModalVisible = true;
}

closeLoginModal(): void {
  this.isLoginModalVisible = false;
}
 

calculateTotalPages(filteredBlogCount: number): void {
  const pages = Math.ceil(filteredBlogCount / this.itemsPerPage);
  this.totalPages = Array.from({ length: pages }, (_, i) => i + 1);
}

applyFilters(): void {
  let filteredBlogs = this.blogs;
  if (this.searchTerm) {
    const searchTermLower = this.searchTerm.toLowerCase();
    filteredBlogs = this.blogs.filter((blog) => {
      const title = blog.title ? blog.title.toLowerCase() : '';
      const author = blog.author ? blog.author.toLowerCase() : '';
      const category = blog.category ? blog.category.toLowerCase() : '';
      return (
        title.includes(searchTermLower)||
        author.includes(searchTermLower)||
        category.includes(searchTermLower)
      );
    });
  }

  if (this.sortOrder === 'newToOld') {
    filteredBlogs.sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime());
  } else {
    filteredBlogs.sort((a, b) => new Date(a.publicationDate).getTime() - new Date(b.publicationDate).getTime());
  }
  this.calculateTotalPages(filteredBlogs.length);

  const startIndex = (this.currentPage - 1) * Number(this.itemsPerPage);
  const endIndex = startIndex + Number(this.itemsPerPage);
  this.displayedBlogs = filteredBlogs.slice(startIndex, Math.min(endIndex, filteredBlogs.length));
}

onSearchTermChange(searchTerm: string): void {
  this.searchTerm = searchTerm;
  this.applyFilters();
}

onSortOrderChange(sortOrder: string): void {
  this.sortOrder = sortOrder;
  this.applyFilters();
}

changeItemsPerPage(itemsPerPage: number): void {
  console.log('Changing items per page to:', itemsPerPage);
  this.itemsPerPage = itemsPerPage;
  this.currentPage =  1;
  this.applyFilters();
}

changePage(page: number): void {
  console.log('Changing to page:', page);
  this.currentPage = page;
  this.applyFilters();
}
}