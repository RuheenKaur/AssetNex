import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from '../../SHARED/logout/logout';


@Component({
  selector: 'app-admin-navbar',
  standalone:true,
  imports: [CommonModule, LogoutComponent],
  templateUrl: './navbar-admin.html',
  styleUrls: ['./navbar-admin.css']
})
export class AdminNavbarComponent implements OnInit {

  adminName = '';
  adminInitials = 'AD';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.adminName = user.name || 'Admin';
    this.adminInitials = this.adminName
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  goToLanding() {
    this.router.navigate(['/']);
  }

  goTo(section: string) {
    this.router.navigate(['/'], { fragment: section });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
