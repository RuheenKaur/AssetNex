import { Component, OnInit } from '@angular/core';
import { TrackTicketService } from './trackticket.service';
import { TrackTicket } from './trackticket.model';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-trackticket',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './trackticket.html',
  styleUrl: './trackticket.css',
})
export class Trackticket implements OnInit {

  tickets: TrackTicket[] = [];

  numericId!: number;
  userName = '';
  userId!: number;

  constructor(
    private trackService: TrackTicketService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}



ngOnInit(): void {

  const storedUser = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  console.log('Stored user:', storedUser);

  this.userId = storedUser.numericId;

  console.log('NumericId used:', this.userId);

  if (!this.userId) {
    console.error('NumericId missing');
    return;
  }

  this.loadTickets();
}


  loadTickets(): void {

  this.trackService
    .getAllTrackTickets(this.userId)
    .subscribe({

      next: (data) => {

        this.tickets = data ?? [];
 this.cdr.detectChanges();
        console.log('Tickets loaded:', this.tickets);

      },

      error: (err) => {

        console.error('Failed loading tickets', err);

      }

    });
}

  goBack(): void {
    this.router.navigateByUrl('/user/dashboarduser');
  }

  goToLanding(): void {
    this.router.navigateByUrl('/landing');
  }
}
