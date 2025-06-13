import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  email: string | null = null;

  constructor(private router: Router) {
    this.email = localStorage.getItem('email');
    console.log('Retrieved Email:', this.email);
  }

}
