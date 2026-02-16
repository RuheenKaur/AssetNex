import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { SupportTicketsPayload } from './supportticketspayload';
import { Observable } from 'rxjs';
import { SupportTicket } from './supporttickets.model';

@Injectable({ providedIn: 'root' })
export class SupportTicketService {

  constructor(private http: HttpClient) {}

  createTicket(ticket: SupportTicketsPayload) {
    return this.http.post(
      `${environment.apibaseUrl}/api/SupportTickets`,
      ticket
    );
  }

  TicketCreate(){}
  getAssignedAssets() {
    return this.http.get<any[]>(
      `${environment.apibaseUrl}/api/SupportTickets/assigned-assets`
    );
  }

  getMyTickets(userId: number) {
    return this.http.get(
      `${environment.apibaseUrl}/api/SupportTickets/user/${userId}`
    );
  }

getAssignedAssetsByUser(userId:number){
this.http.get(
  `${environment.apibaseUrl}/api/SupportTickets/assigned-assets/${userId}`
);
  }
}


