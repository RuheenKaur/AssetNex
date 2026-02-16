import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../environments/environment'
import { AssetMaster } from '../assets-master/asset-master.model';
import { Observable } from 'rxjs';
import { AssetAssignPost } from '../assetassignpost/assetassignpost/assetassignpost.model';

@Injectable({ providedIn: 'root' })
export class DashboardUserService {

  constructor(private http: HttpClient) {}

  getAllAssetsMasterList():Observable<AssetMaster[]>
  {
    return this.http.get<AssetMaster[]>(`${environment.apibaseUrl}/api/AssetsMaster`);
  }

getAllAssignedList():Observable<AssetAssignPost[]>
{
  return this.http.get<AssetAssignPost[]>(`${environment.apibaseUrl}/api/AssetsAssign`);
}




}

