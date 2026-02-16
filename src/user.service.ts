
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Users } from './user.model';
import { Router } from '@angular/router';
import { environment } from './environments/environment';

 @Injectable({
      providedIn: 'root',
    })

export class UserService {
   constructor(private http: HttpClient, private router:Router) {}
  private Subject = new BehaviorSubject<Location[]>([]);
  locations$ = this.Subject.asObservable();

users:Users[]=[];

getUser() : Observable<Users[]>
  {
return this.http.get<Users[]>(`${environment.apibaseUrl}/api/Users`);
  };

  getAssignedAssetsByUser(userId: number)
{
  return this.http.get<any[]>(`${environment.apibaseUrl}/api/AssetAssignments/user/${userId}`);
}

  createUser(Data:Users[]):Observable<Users[]>
  {
    return this.http.post<Users[]>(`${environment.apibaseUrl}/api/Users`, Data);
  }

  getUserById(id: number)
  {
    return this.http.get<Users>(`${environment.apibaseUrl}/api/Users/${id}`);
  }

  getAssignedAssets(userId: number) {
  return this.http.get<any[]>(
    `https://localhost:7297/api/AssetAssignments/user/${userId}`
  );
}
}
