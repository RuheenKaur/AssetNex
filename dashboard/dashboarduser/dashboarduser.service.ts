import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment'

@Injectable({ providedIn: 'root' })
export class DashboardUserService {

  constructor(private http: HttpClient) {}

  // getAllAssetsMasterList()
  // {
  //   return this.http.get(`${environment.apibaseUrl}/api/AssetsMaster`);
  // }

getAllAssignedList()
{
  return this.http.get(`${environment.apibaseUrl}/api/AssetsAssign`);

}

}

