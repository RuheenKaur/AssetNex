

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assetassign } from './assetassignmodel';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetAssignService {

  constructor(private http: HttpClient) {}

  getAssignedAssets(UserId: number): Observable<Assetassign[]> {
    return this.http.get<Assetassign[]>(
      `${environment.apibaseUrl}/api/AssetAssignments/user/${UserId}`
    );
  }
  assignAsset(
  assetId: number,
  userId: number,
  assignedByUserId: number
) {
  return this.http.post(
    `${environment.apibaseUrl}/api/AssetAssignments/${assetId}/assign/${userId}?assignedByUserId=${assignedByUserId}`,
    {}
  );
}



}



