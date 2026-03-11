import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { AssetMaster } from './asset-master.model';
@Injectable({ providedIn: 'root' })
export class AssetsMasterService {

  constructor(private http: HttpClient) {}

  getAllAssetsMasterList():Observable<AssetMaster[]>
  {
    return this.http.get<AssetMaster[]>(`${environment.apibaseUrl}/api/AssetsMaster`);
  }

  getAllAssetsMastersList():Observable<AssetMaster[]>
  {
     return this.http.get<AssetMaster[]>(`${environment.apibaseUrl}/api/AssetsMaster`);
  }

  StatusAssetUpdate(assetId: number, statusId:number, reason: string):Observable<any>
  {
      return this.http.put(`{environment.apibaseUrl}/api/AssetsMaster/${assetId}`, {statusId, reason});
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

assignAsset(assetId: number, assignedToUserId: number, assignedByUserId: number) {
  return this.http.post(
    `${environment.apibaseUrl}/api/AssetAssignments/assign`,
    null,
    {
      params: {
        assetId,
        assignedToUserId,
        assignedByUserId
      }
    }
  );
}
}


