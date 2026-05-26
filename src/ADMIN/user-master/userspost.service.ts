import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { environment } from '../../environments/environment';
import {UserspostModel} from './userspost/userspost.model';
import { Assetassign } from '../../USER/asset-assign/assetassignmodel';


@Injectable({ providedIn: 'root' })
export class UserPostService {

  constructor(private http: HttpClient) {}

  getAllUsers():Observable<UserspostModel[]>
  {
    return this.http.get<UserspostModel[]>(`${environment.apibaseUrl}/api/Users`)
  }

  deactivate(userId: number): Observable<any> {
    return of({ success: true });
  }

  deactivateUser(id: number): Observable<any> {
  return this.http.put(`${environment.apibaseUrl}/api/Users/deactivate/${id}`, {});
}

deleteUser(id: number): Observable<any> {
  return this.http.delete(`${environment.apibaseUrl}/api/Users/${id}`);
}


createUser(payload: any): Observable<any> {
  return this.http.post(
    `${environment.apibaseUrl}/api/Users`,
    payload,
    { responseType: 'text' }
  );
}

updateUser(user: any): Observable<any> {
  return this.http.put(`${environment.apibaseUrl}/api/Users/${user.id}`, user);
}


getAssignedAssets(userId: number): Observable<Assetassign[]>
    {
      return this.http.get<Assetassign[]>(
        `${environment.apibaseUrl}/api/AssetAssignments/user/${userId}`
      );
    }

}


