import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupportTicketService } from '../supporttickets.service';
import { Router } from '@angular/router';
import { SupportTicketPostService } from '../../supportticketspost/supportticketspost.service';

@Component({
  selector: 'app-track-tickets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trackticket.html',
  styleUrls: ['./trackticket.css']
})
export class TrackTicketsComponent implements OnInit {

  tickets: any[] = [];
  filteredTickets: any[] = [];
  loading = false;
  error = '';
  searchTerm = '';

  constructor(
    private ticketService: SupportTicketPostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.numericId;
    if (!userId) { this.error = 'User not found. Please log in again.'; return; }

    this.loading = true;
    this.error = '';

    this.ticketService.getAllTrackTickets(userId).subscribe({
      next: (res) => {
        this.tickets = res;
        this.filteredTickets = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load tickets. Please try again.';
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredTickets = this.tickets.filter(t =>
      t.issueCategory?.toLowerCase().includes(term) ||
      t.issueDescription?.toLowerCase().includes(term) ||
      t.statusName?.toLowerCase().includes(term) ||
      t.priority?.toLowerCase().includes(term)
    );
  }
getStatusBadgeClass(statusName: string): string {
  const map: any = {
    'open':        'badge-open',
    'in progress': 'badge-progress',
    'resolved':    'badge-resolved',
    'closed':      'badge-closed'
  };
  return map[statusName?.toLowerCase().trim()] || 'badge-closed';
}

getTicketCardClass(statusName: string): string {
  const map: any = {
    'open':        'status-open',
    'in progress': 'status-progress',
    'resolved':    'status-resolved',
    'closed':      'status-closed'
  };
  return map[statusName?.toLowerCase().trim()] || '';
}



  goBack(): void {
    this.router.navigate(['/user/dashboard']);
  }
}
