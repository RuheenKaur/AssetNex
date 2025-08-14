
import { Injectable } from '@angular/core';
// import { AddInventoryRequest } from '../models/add-inventory-request model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DisposeDetails} from '../models/e-dispose.model';
import { environment} from '../../environments/environment';
 import { UpdateDisposeAssetRequest } from '../models/update-e-dispose.model';
 import {AddDisposeAssetRequest} from '../models/add-e-dispose.model';

@Injectable({
  providedIn: 'root'
})
export class EDisposeService {



constructor( private http : HttpClient) { }



getDisposedAssets() : Observable<DisposeDetails[]>//get all

  {
return this.http.get<DisposeDetails[]>(`${environment.apibaseUrl}/api/ewaste/disposable-assets`);
  }

  addDisposedAssets (model : AddDisposeAssetRequest) : Observable <void>{// put
    
    return this.http.post<void>(`${environment.apibaseUrl}/api/ewaste/disposable-assets`, model);
  }


  getDisposedAssetsById (id :string) : Observable<DisposeDetails>//get by id 
{
   return this.http.get<DisposeDetails>(`${environment.apibaseUrl}/api/ewaste/disposable-assets/${id}`);

};

 updateDisposedAssets(id : string , updateAssetRequest: UpdateDisposeAssetRequest) : Observable<DisposeDetails>//update
{
return this.http.put<DisposeDetails>(`${environment.apibaseUrl}/api/ewaste/disposable-assets/${id}`, updateAssetRequest);
}

 deleteDisposedAssets(id : string): Observable <DisposeDetails> //delete
{
  return this.http.delete<DisposeDetails>(`${environment.apibaseUrl}/api/ewaste/disposable-assets /${id}`);

}
}


  
//   // error : (error)=>{

//   // }


// //to connect apis and angualr we use http, we also will have to observable , a promise that we have to subscribe to 