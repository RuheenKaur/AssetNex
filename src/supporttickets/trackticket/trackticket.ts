import { Component, OnInit } from '@angular/core';
import { TrackTicketService } from './trackticket.service';
import { TrackTicket } from './trackticket.model';
import { ChangeDetectorRef } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trackticket',
  imports: [TableModule,CommonModule],
  templateUrl: './trackticket.html',
  styleUrl: './trackticket.css',
})
export class Trackticket implements OnInit {
userId:any;
currentUser:any;
userName:any;
goTo:any;
  tickets: TrackTicket[]=[];
  constructor(private trackService:TrackTicketService, private cdRef:ChangeDetectorRef, private router: Router){}

  ngOnInit()
{

  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  this.userId = storedUser.id;
  this.userName=storedUser.name;
  console.log('Stored user:', storedUser);
  console.log('UserId used for asset API:', this.userId);
  console.log('User name:', this.userName);

  if (!this.userId) {
    console.error('UserId not found');
    return;
  }
     this.trackService.getAllTrackTickets(this.userId).subscribe(data => {
    this.tickets = data;
    console.log('Ticket Tracking', data);
  });

  this.trackService.getAllTrackTickets(this.userId).subscribe({
    next:(data) =>
    {
      this.tickets= data;
    },
    error:err => {
      console.error(err);
    }
  })
}

goBack()
{
  this.router.navigateByUrl('user/dashboarduser')
}

goToLanding()
{
  this.router.navigateByUrl('/landing');
}

}
