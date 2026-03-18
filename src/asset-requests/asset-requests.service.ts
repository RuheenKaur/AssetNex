import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AssetRequest } from './asset-requests.model';

import { Observable } from 'rxjs';
import { AssetRequestsPayload } from './assetrequestspayload';

import { AdminAssetRequest } from './admin-assetrequests/adminassetrequest.model';
@Injectable({ providedIn: 'root' })
export class AssetRequestService {
constructor(private http: HttpClient) {}

createRequest(payload: AssetRequestsPayload) {
  return this.http.post(
    `${environment.apibaseUrl}/api/asset-requests`,
    payload
  );
}

getStatuses(category: string) {
  return this.http.get<any[]>(
    `${environment.apibaseUrl}/api/statuses?category=${category}`
  );
}

updateStatus(id: number, statusId: number) {
  return this.http.patch(
    `${environment.apibaseUrl}/api/asset-requests/${id}/status`,
    { statusId }
  );
}

getAssetRequestsV1()
{
    return this.http.get(`${ environment.apibaseUrl}/ api / v1 / asset - requests`);
}

getAssetRequestsV2()
{
    return this.http.get(`${ environment.apibaseUrl}/ api / v2 / asset - requests`);
}

  getAllRequests():Observable<AdminAssetRequest[]> {
  return this.http.get<AdminAssetRequest[]>(
    `${environment.apibaseUrl}/api/AssetRequests`
  );
}

}

