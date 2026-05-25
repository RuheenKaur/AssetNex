import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from '../shared/logout/logout';

@Component({
  selector: 'app-user-navbar',
  standalone: true,
  imports: [CommonModule, LogoutComponent],
  templateUrl: './navbar-user.html',
  styleUrls: ['./navbar-user.css']
})
export class UserNavbarComponent implements OnInit {

  userName = '';
  userInitials = 'U';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = user.name || 'User';
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
