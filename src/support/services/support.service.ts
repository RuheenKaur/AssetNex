import { Injectable } from '@angular/core';
// import { AddInventoryRequest } from '../models/add-inventory-request model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Support} from '../models/support.model';
import { environment} from '../../environments/environment';
import { addSupport } from '../models/addSupport.model';
import { updateSupport } from '../models/updateSupport.model';

@Injectable({
  providedIn: 'root'
})
export class SupportService {


constructor( private http : HttpClient) { }

//post
createSupport (Data: addSupport): Observable<Support[]>

{
  return this.http.post<Support[]>(`${environment.apibaseUrl}/api/newsupport`, Data);
}

//get
getAllSupport(): Observable<Support[]>
{
  return this. http.get<Support[]>(`${environment.apibaseUrl}/api/newsupport`);
}

//getbyid
getSupportById(id:string) : Observable<Support[]>

  {
return this.http.get<Support[]>(`${environment.apibaseUrl}/api/support/${id}`);
  }

//addSupport

  addSupport(id:string,Data:addSupport):Observable<addSupport[]>
  {
return this.http.put<addSupport[]>(`${environment.apibaseUrl}/api/support/${id}`, Data);
  }

  //update
  updateSupport(id:string, Data:updateSupport) : Observable<Support[]>
  {
    return this.http.put<updateSupport[]>(`${environment.apibaseUrl}/api/support/${id}`, Data);
  }

  deleteSupport(id:string):Observable<Support[]>
  {
    return this.http.delete<updateSupport[]>(`${environment.apibaseUrl}/api/support/${id}`);

  }

}


  
//   // error : (error)=>{

//   // }


// //to connect apis and angualr we use http, we also will have to observable , a promise that we have to subscribe to 