import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AssetsHistoryModel } from '../asset-history/asset-history.model';
import { SupportTicket } from '../supporttickets/supporttickets.model';

@Injectable({ providedIn: 'root' })
export class DashboardService
{

  constructor(private http: HttpClient) {}

getAllAssignedList()
{
  return this.http.get(`${environment.apibaseUrl}/api/AssetsAssign`);
}

getAllAssetsMaster()
{
return this.http.get(`${environment.apibaseUrl}/api/AssetsMaster`);
}

getAllAssetsHistory():Observable<AssetsHistoryModel[]>
{
return this.http.get<AssetsHistoryModel[]>(`${environment.apibaseUrl}/api/AssetsHistory`);
}

getAllAssetRequests()
{
return this.http.get(`${environment.apibaseUrl}/api/AssetRequests`)
}


getAllAssetSoftware()
{
return this.http.get(`${environment.apibaseUrl}/api/AssetSoftware`)
}


}


