import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

private accessToken: string | null = null;
private email: string | null = null;
private role: string | null = null;
private userId: string | null = null;
private numericId: number | null = null;
private userName: string | null = null;
private contact: string | null = null;

saveUser(res: any) {
  this.accessToken = res.accessToken;
  this.email = res.email;
  this.role = res.role;
  this.userId = res.id;
  this.numericId = res.numericId;
  this.userName = res.name;
  this.contact = res.contact;
}

getAccessToken(): string | null { return this.accessToken; }
getRole(): string | null { return this.role; }
getUserId(): string | null { return this.userId; }
getNumericId(): number | null { return this.numericId; }
getUserName(): string | null { return this.userName; }
getEmail(): string | null { return this.email; }
getContact(): string | null { return this.contact; }
isAuthenticated(): boolean { return !!this.accessToken; }



  constructor(private http: HttpClient, private router: Router) {}

  login(data: { email: string; password: string }) {
    return this.http.post<any>(
      `${environment.apibaseUrl}/api/Auth/login`,
      data,
      { withCredentials: true }
    );
  }

  refresh() {
    return this.http.post<any>(
      `${environment.apibaseUrl}/api/Auth/refresh`,
      {},
      { withCredentials: true }
    );
  }


  logout(): void {
    this.http.post(`${environment.apibaseUrl}/api/Auth/logout`, {}, { withCredentials: true }).subscribe();
    this.accessToken = null;
    this.email = null;
    this.role = null;
    this.userId = null;
    this.userName = null;
    this.router.navigateByUrl('/login/auth');
  }
}