import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {

    const url = state.url;

    // Check if user logged in using sessionStorage
    const isLoggedIn = sessionStorage.getItem('isUserLoggedIn');

    console.log("In Auth Guard, URL:", url);

    // If user is logged in
    if (isLoggedIn === 'true') {

      // If logged-in user tries to access /login, redirect to dashboard
      if (url === "/login") {
        return this.router.parseUrl('/dashboard'); // change '/dashboard' to your home route
      }

      return true; // authenticated, allow access
    }

    // If not logged in → redirect to login
    return this.router.parseUrl('/login');
  }
}
