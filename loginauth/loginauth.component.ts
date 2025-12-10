import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-loginauth',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './loginauth.component.html',
  styleUrls: ['./loginauth.component.css']
})
export class LoginauthComponent implements OnInit {

  email = '';
  password = '';
  error = '';
  loading = false;
  goTo:any;


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

isAdmin(): boolean {
  const role = localStorage.getItem('role');
  return role === 'Admin';
}

  goToLanding() {
    this.router.navigateByUrl('/landing');
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  login(): void {
    this.error = '';
    this.loading = true;

    if (!this.email || !this.password) {
      this.error = 'Please fill in all required fields';
      this.loading = false;
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.error = 'Please enter a valid email';
      this.loading = false;
      return;
    }

    const request = {
      email: this.email.trim(),
      password: this.password.trim()
    };

    this.authService.login(request).subscribe({

      next: (res) => {
        console.log('Login response:', res);


        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        localStorage.setItem('tokenExpiry', res.expiration);


        localStorage.setItem('role', res.role);


        localStorage.setItem('user', JSON.stringify(res.user));


        if (res.role === 'Admin') {
          this.router.navigateByUrl('/dashboard');
        }
        else if (res.role === 'User') {
          this.router.navigateByUrl('/dashboarduser');
        }

        this.loading = false;
      },

      error: (err) => {
        console.error('Login failed', err);

        if (err.status === 401) {
          this.error = 'Invalid email or password';
        } else {
          this.error = 'Login failed. Please try again.';
        }

        this.loading = false;
      }

    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      const role = localStorage.getItem('role');

      if (role === 'Admin') {
        this.router.navigateByUrl('/dashboard');
      } else if (role === 'User') {
        this.router.navigateByUrl('/dashboarduser');
      }
    }
  }

}
