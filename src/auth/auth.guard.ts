import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      this.router.navigate(['/landing']);
      return false;
    }

    const userStr = localStorage.getItem('user');
    if (!userStr) {
      this.router.navigate(['/landing']);
      return false;
    }

    const user = JSON.parse(userStr);
    const expectedRole = route.data['role'];

    if (expectedRole && user.role !== expectedRole) {
      // Wrong role — redirect to their correct dashboard
      if (user.role === 'Admin') {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/user/dashboard']);
      }
      return false;
    }

    return true;
  }
}
