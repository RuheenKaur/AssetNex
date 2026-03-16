import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AssetsHistoryModel } from './asset-history.model';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })


export class AssetHistoryService {

  constructor(private http: HttpClient) {}
getAllAssetsHistory():Observable<AssetsHistoryModel[]>
{
return this.http.get<AssetsHistoryModel[]>(`${environment.apibaseUrl}/api/asset-history`);
}

getAssetHistoryByAssetId(assetId:number)
{
return this.http.get<AssetsHistoryModel[]>(`${environment.apibaseUrl}/api/asset-history
  /${assetId}`)
}

getAssetHistoryById(id:number)
{
  return this.http.get(`${environment.apibaseUrl}/api/asset-history/${id}`)
}


// CreateAssetHistory()
// {
//   return this.http.post(`${environment.apibaseUrl}/api/asset-history`)
// }

deleteAssetHistory(id:number)
{
   return this.http.delete(`${environment.apibaseUrl}/api/asset-history`);
}
}


