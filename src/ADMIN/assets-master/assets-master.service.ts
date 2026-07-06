import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AssetMaster } from './asset-master.model';
@Injectable({ providedIn: 'root' })
export class AssetsMasterService {

  constructor(private http: HttpClient) {}

  getAllAssetsMasterList():Observable<AssetMaster[]>
  {
    return this.http.get<AssetMaster[]>(`${environment.apibaseUrl}/api/AssetsMaster`);
  }

updateAssetStatus(assetId: number, statusId: number) {
  return this.http.put(
    `${environment.apibaseUrl}/api/AssetsMaster/${assetId}`,
    { statusId }
  );
}

getStatusId(statusId:number)
{
  return this.http.get(`${environment.apibaseUrl}/api/AssetsMaster/status/${statusId}`);
}

  updateAsset(asset: AssetMaster): Observable<AssetMaster> {
    return this.http.put<AssetMaster>(
      `${environment.apibaseUrl}/api/AssetsMaster/${asset.id}`,
      asset
    );
  }

  getAssetById(id: number): Observable<AssetMaster> {
    return this.http.get<AssetMaster>(`${environment.apibaseUrl}/api/AssetsMaster/${id}`);
  }

  getAssetsPaged(page:number, pageSize:number, search: string=''){
  return this.http.get<any>(
    `${environment.apibaseUrl}/api/AssetsMaster/paged`,
    { params:{
      page, pageSize,search
    }}
  );
}

assignAsset(assetId: number, assignedToUserId: number) {
  return this.http.post(
    `${environment.apibaseUrl}/api/AssetAssignments/assign`,
    null,
    {
      params: {
        assetId,
        assignedToUserId
      }
    }
  );
}

createAsset(payload: any): Observable<any> {
  return this.http.post(`${environment.apibaseUrl}/api/AssetsMaster`, payload);
}

unassignAsset(assetId: number): Observable<any> {
  return this.http.put(
    `${environment.apibaseUrl}/api/AssetAssignments/unassign?assetId=${assetId}`,
    {}
  );
}

reassignAsset(assetId: number, newUserId: number): Observable<any> {
  return this.http.post(
    `${environment.apibaseUrl}/api/AssetAssignments/reassign?assetId=${assetId}&newUserId=${newUserId}`,
    {}
  );
}

updateAssetStatusOnly(assetId: number, statusId: number): Observable<any> {
  return this.http.patch(
    `${environment.apibaseUrl}/api/AssetsMaster/${assetId}/status`,
    { statusId }
  );
}
}




