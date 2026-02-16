
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './loginauth.component.html',
  styleUrls: ['./loginauth.component.css']
})
export class LoginAuthComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  error = '';
  goTo:any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.error = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {

        const token = res.accessToken;
        const decoded: any = jwtDecode(token);

        const user = {
          id: res.id,
          name: res.name,
          email: res.email,
          role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
        };

        localStorage.setItem('token', token);
        localStorage.setItem('userId', res.id.toString());
        localStorage.setItem('user', JSON.stringify(user));

        console.log('Logged in user:', user);

        if (user.role === 'Admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/user/dashboard']);
        }

        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error || 'Login failed';
        this.loading = false;
      }
    });
  }

  goToLanding()
  {
    this.router.navigateByUrl('/landing');
  }

  onLogOut() {
    this.authService.logout();
    this.router.navigate(['/landing']);
  }
}
