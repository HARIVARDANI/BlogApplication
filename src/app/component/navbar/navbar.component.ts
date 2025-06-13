import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoleService } from '../../role.service';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule,NgFor],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

//   @Output() searchTermChange = new EventEmitter<string>();
//   @Output() sortOrderChange = new EventEmitter<string>();
//   @Output() loginModalToggle = new EventEmitter<void>();
//   @Output() itemsPerPageChange = new EventEmitter<number>();
 
//   searchTerm: string = '';
//   sortOrder: string = 'newToOld';
//   itemsPerPage: number = 8;
//   itemsPerPageOptions: number[] = [5, 10, 15, 20];

//   constructor(private roleService: RoleService) {}

//   openLoginModal(): void {
//     this.loginModalToggle.emit();
//   }

//   // openLoginModalAsAuthor(): void {
//   //   //this.roleService.setRole('author'); 
//   //   this.loginModalToggle.emit(); 
//   // }

//   applyFilters(): void {
//     this.searchTermChange.emit(this.searchTerm);
//     this.sortOrderChange.emit(this.sortOrder);
//   }

//   onItemsPerPageChange(): void {
//     this.itemsPerPageChange.emit(this.itemsPerPage);
//   }
  

 }

