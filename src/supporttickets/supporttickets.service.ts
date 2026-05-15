import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { SupportTicketsPayload } from './supportticketspayload';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SupportTicketService {

  private apiUrl = `${environment.apibaseUrl}/api/support-tickets`;

  constructor(private http: HttpClient) {}


  createTicket(ticket: SupportTicketsPayload): Observable<any> {
    return this.http.post(
      this.apiUrl,
      ticket
    );
  }


  getAssignedAssets(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/assigned-assets`
    );
  }


  getAssignedAssetsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/assigned-assets/${userId}`
    );
  }


  getTicketComments(ticketId: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/${ticketId}/comments`
    );
  }
}
