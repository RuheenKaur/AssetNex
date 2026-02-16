import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

constructor(private http: HttpClient, private router:Router) {}

login(data: { email: string; password: string }) {
  return this.http.post<any>(
    `${environment.apibaseUrl}/api/Auth/login`,
    data
  );
}

  saveUser(res: any)
  {
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    localStorage.setItem('email', res.email);
    localStorage.setItem('role', res.role);
    localStorage.setItem('Id',res.id);
    localStorage.setItem('User Name', res.name);
    localStorage.setItem('isLoggedIn', 'true');
  }


  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }


  logout(): void {
    localStorage.removeItem('storeduser');
    sessionStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    this.router.navigateByUrl('/login/auth');
  }

  outlog() : void {
    localStorage.removeItem('storedUser');
    sessionStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    this.router.navigateByUrl('login/auth');
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('userToken');
  }
}


