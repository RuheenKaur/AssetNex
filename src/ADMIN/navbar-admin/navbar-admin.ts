import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from '../../shared/logout/logout';
import { AuthService } from '../../shared/auth/auth.service';


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
  name : any;

  constructor(private router: Router, private authService: AuthService) {}

ngOnInit(): void {
  this.adminName = this.authService.getUserName() || 'User';
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
