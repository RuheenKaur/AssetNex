// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, BehaviorSubject } from 'rxjs';
// import { tap } from 'rxjs/operators';



// interface LoginRequest {
//   email: string;
//   password: string;
// }

// interface LoginResponse {
//   token: string;
//   expiration: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   url='';
//   private apiUrl = 'https://localhost:7195/api/Auth';
//   private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

//   isLoggedIn$ = this.loggedIn.asObservable();

//   constructor(private http: HttpClient) {}

//   login(request: { email: string; password: string }): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, request);
//   }
//   loginn(request: LoginRequest): Observable<LoginResponse> {
//     return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request).pipe(
//       tap((res: LoginResponse) => {
//         localStorage.setItem('token', res.token);
//         this.loggedIn.next(true);
//       })
//     );
//   }

//    register(request: { email: string; password: string }): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, request);
//   }

//   logout() {
//     localStorage.removeItem('token');
//     this.loggedIn.next(false);
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   private hasToken(): boolean {
//     return !!localStorage.getItem('token');
//   }


//   }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {environment} from '././../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}
  login(request: any): Observable<any> {
    return this.http.post(`${environment.apibaseUrl}/api/Auth/login`, request).pipe(
      tap((response: any) => {
        if (response && response.token)
          {
          localStorage.setItem('accessToken', response.token);
          localStorage.setItem('expiration', response.expiration);
        }
      })
    );
  }

//   getCurrentUser() {
//   return this.http.get<any>('https://localhost:7034/api/auth/me');
// }

getCurrentUser() {
  return this.http.get<any>('https://localhost:7297/api/Auth/me', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
}

  saveToken(token: string, role: string) {
  localStorage.setItem('token', token);
  localStorage.setItem('role', role);
}


  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiration');
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

isAuthenticated(): boolean {
  const token = localStorage.getItem('accessToken');
  const expiry = localStorage.getItem('tokenExpiry');

  if (!token || !expiry) return false;

  return new Date(expiry) > new Date();
}

  getRefreshToken():string| null{
    return localStorage.getItem('refreshToken');
  }

  isRefreshed():boolean{
    const refreshToken= this.getRefreshToken();
    if(!refreshToken) return false;
    const refreshExpiry= localStorage.getItem('refreshTokenExpiry');
    if(!refreshExpiry) return false;
    return new Date(refreshExpiry) > new Date();
  }
}
