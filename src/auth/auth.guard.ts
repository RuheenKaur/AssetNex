import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const userStr = localStorage.getItem('user');

    if (!userStr) {
      this.router.navigate(['/landing']);
      return false;
    }

    const user = JSON.parse(userStr);

    // Optional: check role if needed
    if (!user.role) {
      this.router.navigate(['/landing']);
      return false;
    }

    return true;
  }
}
