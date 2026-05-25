import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { AssetRequestsPayload } from './assetrequestspayload';
import { AdminAssetRequest } from './admin-assetrequests/adminassetrequest.model';

@Injectable({ providedIn: 'root' })
export class AssetRequestService {

  constructor(private http: HttpClient) {}

  // USER
  createRequest(payload: AssetRequestsPayload) {
    return this.http.post(
      `${environment.apibaseUrl}/api/AssetRequests/create`,
      payload
    );
  }

  //USER
  getMyRequests(userId: number): Observable<any[]> {
  return this.http.get<any[]>(
    `${environment.apibaseUrl}/api/AssetRequests/user/${userId}`
  );
}

  // SHARED
  getStatuses(category: string) {
    return this.http.get<any[]>(
      `${environment.apibaseUrl}/api/AssetRequests/statuses?category=${category}` // ← fixed
    );
  }

  // ADMIN
  getAllRequests(): Observable<AdminAssetRequest[]> {
    return this.http.get<AdminAssetRequest[]>(
      `${environment.apibaseUrl}/api/AssetRequests`
    );
  }

  updateStatus(id: number, statusId: number) {
    return this.http.patch(
      `${environment.apibaseUrl}/api/AssetRequests/${id}/status`,
      { statusId }
    );
  }

  getAssetRequestsV1() {
    return this.http.get(`${environment.apibaseUrl}/api/v1/asset-requests`);
  }

  getAssetRequestsV2() {
    return this.http.get(`${environment.apibaseUrl}/api/v2/asset-requests`);
  }

updateRequestReview(id: number, statusId: number, adminNotes: string): Observable<any> {
  return this.http.patch(
    `${environment.apibaseUrl}/api/AssetRequests/${id}/review`,
    { statusId, adminNotes }
  );
}

}
