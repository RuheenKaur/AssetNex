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
return this.http.get<AssetsHistoryModel[]>(`${environment.apibaseUrl}/api/AssetsHistory`);
}


}
