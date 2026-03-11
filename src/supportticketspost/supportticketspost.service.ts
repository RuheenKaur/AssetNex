import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { TrackTicket } from "../supporttickets/trackticket/trackticket.model";

@Injectable({ providedIn: 'root' })
export class SupportTicketPostService {
  private apiUrl = `${environment.apibaseUrl}/api/support-tickets`;

  constructor(private http: HttpClient) {}

  getAdminTickets(
    pageNumber: number,
    pageSize: number,
    search: string,
    sortField: string,
    sortOrder: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('search', search || '')
      .set('sortField', sortField)
      .set('sortOrder', sortOrder);

    return this.http.get<any>(`${this.apiUrl}/admin`, { params });
  }

  getComments(ticketId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${ticketId}/comments`);
  }

  addComment(ticketId: number, payload: { message: string; type: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/${ticketId}/comment`, payload);
  }

getConnents(ticketId: number): Observable<any[]>
{
  return this.http.get<any[]>(`${this.apiUrl}/${ticketId}/comments`);
}
  updateStatus(ticketId: number, statusId: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${ticketId}/status`, { statusId });
  }

  deleteTicket(ticketId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${ticketId}`);
  }


  getAllTrackTickets(userId: number): Observable<TrackTicket[]> {
    return this.http.get<TrackTicket[]>(`${this.apiUrl}/user/${userId}`);
  }
}
