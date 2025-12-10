import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SupportTicket } from '../../../USER/supporttickets/supporttickets.model';
import { SupportTicketService } from '../../../USER/supporttickets.service';

@Component({
  selector: 'app-dashboarduser',
  imports: [RouterLink],
  templateUrl: './dashboarduser.component.html',
  styleUrl: './dashboarduser.component.css'
})
export class DashboarduserComponent {
constructor(private router: Router, private dashboardService: SupportTicketService){}


SupportTicket: SupportTicket[]=[];

goTo:any;
goToLanding()
{
  this.router.navigateByUrl('/landing');
}

AssetsRequests()
{
  this.router.navigateByUrl('/assetsrequests');
}

Logout()
{
  this.router.navigateByUrl('/logout');
}

StatusTicket()
{
  this.router.navigateByUrl('/statusticket');
}

SupportTickets()
{
  this.router.navigateByUrl('/supporttickets');
}
}
