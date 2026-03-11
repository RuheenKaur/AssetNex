
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, ObservableNotification } from 'rxjs';
import { TrackTicket } from './trackticket.model';


@Injectable({ providedIn: 'root' })
export class TrackTicketService {

  constructor(private http: HttpClient) {}

  getAllTrackTickets(userId:number):Observable<TrackTicket[]>
  {
    return this.http.get<TrackTicket[]>(`${environment.apibaseUrl}/api/support-tickets/user/${userId}`)
  }

}

