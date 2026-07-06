import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from '../../shared/logout/logout';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-user-navbar',
  standalone: true,
  imports: [CommonModule, LogoutComponent],
  templateUrl: './navbar-user.html',
  styleUrls: ['./navbar-user.css']
})
export class UserNavbarComponent implements OnInit {

  userName = '';
  name = this.authService.getUserName() || 'User';
  userInitials = 'U';

  constructor(private router: Router, private authService: AuthService) {}


ngOnInit(): void {
  this.userName = this.authService.getUserName() || 'User';
  this.userInitials = this.userName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
  goToLanding() {
    this.router.navigate(['/']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
