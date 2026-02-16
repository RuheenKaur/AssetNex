import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { AssetSoftwareModel } from './asset-software-model';
@Injectable({ providedIn: 'root' })


export class AssetSoftwareService {

  constructor(private http: HttpClient) {}

getAllAssetSoftware():Observable<AssetSoftwareModel[]>
{
return this.http.get<AssetSoftwareModel[]>(`${environment.apibaseUrl}/api/AssetSoftware`);
}


}
