
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SoftwareLicense} from '../models/software-model';
import { environment} from  '../../../environments/environment';
import { AddSoftwareLicenseRequest } from '../models/add-software-model.js';


@Injectable({
  providedIn: 'root'
})

export class SoftwareLicenseService {

constructor( private http : HttpClient) { }

getSoftwareLicense() : Observable<SoftwareLicense[]>//get all

  {
// return this.http.get<SoftwareLicense[]>(`${environment.apibaseUrl}/api/softwarelicense`);
return this.http.get<SoftwareLicense[]>('api/softwarelicense');

  }

  addSoftwareLicense (model : AddSoftwareLicenseRequest) : Observable <void>

  {// post
    
    return this.http.post<void>(`${environment.apibaseUrl}/api/softwarelicense`, model);
  }


  getSoftwareLicenseById (id :string) : Observable<SoftwareLicense>//get by id 
{
   return this.http.get<SoftwareLicense>(`${environment.apibaseUrl}/api/softwarelicense/${id}`);

};

 updateSoftwareLicense(id : string , updateSoftwareLicenseRequest: SoftwareLicense) : Observable<SoftwareLicense>//update
{
return this.http.put<SoftwareLicense>(`${environment.apibaseUrl}/api/softwarelicense/${id}`, updateSoftwareLicenseRequest);
}

 deleteSoftwareLicense(id : string): Observable <SoftwareLicense> //delete
{
  return this.http.delete<SoftwareLicense>(`${environment.apibaseUrl}/api/softwarelicense/${id}`);

}

}
