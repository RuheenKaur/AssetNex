import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { environment } from '../environments/environment';
import {UserspostModel} from './userspost/userspost.model';
import { Assetassign } from '../assetassign/assetassignmodel';


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

  updateUser(id:number)
  {
    return this.http.put(`${environment.apibaseUrl}/api/Users/update-user`, id);
  }


    getAssignedAssets(userId: number): Observable<Assetassign[]>
    {
      return this.http.get<Assetassign[]>(
        `${environment.apibaseUrl}/api/AssetAssignments/user/${userId}`
      );
    }

  deactivateUser(userId: number): Observable<void> {
    return this.http.put<void>(`${environment.apibaseUrl}/deactivate/${userId}`, {});
  }
}


