
import { Injectable } from '@angular/core';
// import { AddInventoryRequest } from '../models/add-inventory-request model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Assets} from '../models/inventory-model';
import { environment} from '../../environments/environment';
 import { UpdateAssetRequest } from '../models/update-assets-model';
import { AddAssetRequest } from '../models/add-assets-model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {


constructor( private http : HttpClient) { }

getAllAssets() : Observable<Assets[]>

  {
return this.http.get<Assets[]>(`${environment.apibaseUrl}/api/assets`);
  }

  addAssets (model : AddAssetRequest) : Observable <void>{
    
    return this.http.post<void>(`${environment.apibaseUrl}/api/assets`, model);
  }


  getAssetById (id :string) : Observable<Assets>
{
   return this.http.get<Assets>(`${environment.apibaseUrl}/api/assets/${id}`);

};

 updateAssets(id : string , updateAssetRequest: UpdateAssetRequest) : Observable<Assets>
{
return this.http.put<Assets>(`${environment.apibaseUrl}/api/assets/${id}`, updateAssetRequest);
}

 deleteCategory(id : string): Observable <Assets> 
{
  return this.http.delete<Assets>(`${environment.apibaseUrl}/api/assets/${id}`);

}
}


  
//   // error : (error)=>{

//   // }


// //to connect apis and angualr we use http, we also will have to observable , a promise that we have to subscribe to 