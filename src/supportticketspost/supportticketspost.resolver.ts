import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SupportTicketPostService } from './supportticketspost.service';


@Injectable({ providedIn: 'root' })
export class SupportTicketsResolver implements Resolve<any> {

constructor(private ticketService: SupportTicketPostService) {}

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
Observable<any>
{
  console.log('Resolver started -- fetching before route loads' );
  return this.ticketService.getAdminTickets(1,10, '', 'createdAt', 'desc')
  .pipe(tap(data => console.log('Resolver complete -- data ready:', data)));
}
}
