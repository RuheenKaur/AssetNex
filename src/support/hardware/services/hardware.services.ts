
import { Injectable } from '@angular/core';
// import { AddInventoryRequest } from '../models/add-inventory-request model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HardwareModel } from '../models/hardware-model';
import { environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HardwareService{


constructor( private http : HttpClient) { }

getAllHardware() : Observable<HardwareModel[]>

  {
return this.http.get<HardwareModel[]>(`${environment.apibaseUrl}/api/hardware`);
  }

  addHardware (model : HardwareModel) : Observable <void>{
    
    return this.http.post<void>(`${environment.apibaseUrl}/api/hardware/add`, model);
  }


  getAssetById (id :string) : Observable<HardwareModel>
{
   return this.http.get<HardwareModel>(`${environment.apibaseUrl}/api/hardware${id}`);

};

 updateAssets(id : string , updateHardwareRequest: HardwareModel) : Observable<HardwareModel>
{
return this.http.put<HardwareModel>(`${environment.apibaseUrl}/api/hardware/${id}`, updateHardwareRequest);
}

 deleteCategory(id : string): Observable <HardwareModel> 
{
  return this.http.delete<HardwareModel>(`${environment.apibaseUrl}/api/hardware${id}`);

}
}


  
//   // error : (error)=>{

//   // }


// //to connect apis and angualr we use http, we also will have to observable , a promise that we have to subscribe to 