import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',

  templateUrl: './logout.html',
  styleUrls: ['./logout.css']
})
export class LogoutComponent {

  constructor(private router: Router) {}

  // logout(): void {

  //   localStorage.clear();
  //   sessionStorage.clear();

  //   this.router.navigate(['/login']);
  // }

  logout(): void {

  localStorage.removeItem('token');
  localStorage.removeItem('user');

  this.router.navigate(['/login']);
}
}
