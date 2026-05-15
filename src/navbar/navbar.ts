import { Component } from '@angular/core';
import {Router } from '@angular/router';
import { LogoutComponent } from '../shared/logout/logout';

@Component({
  selector: 'app-navbar',
  imports: [LogoutComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
constructor(private router:Router){}

  goToLanding()
  {
    this.router.navigateByUrl('/landing')
  }
  goTo(path: string) {
  this.router.navigateByUrl(path);
}
  logout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
