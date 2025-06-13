import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private role: string | null = null;

  setRole(role: string): void {
    this.role = role;
    localStorage.setItem('role', role); 
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }
  

  clearRole(): void {
    this.role = null;
    localStorage.removeItem('role'); 
  }
}
