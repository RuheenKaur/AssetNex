import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SupportTicketPostService } from './supportticketspost.service';

@Injectable({
  providedIn: 'root'
})
export class SupportTicketsResolver implements Resolve<any> {

  constructor(
    private ticketService: SupportTicketPostService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    console.log('Resolver started');

    return this.ticketService
      .getAdminTickets(
        1,
        10,
        '',
        'CreatedAt',
        'desc'
      )
      .pipe(
        catchError((err) => {

          console.error('Resolver failed:', err);

          return of({
            data: [],
            pagination: {
              totalCount: 0
            }
          });
        })
      );
  }
}
