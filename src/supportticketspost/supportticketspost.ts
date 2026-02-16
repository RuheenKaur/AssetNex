import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { SupportTicketPostService } from './supportticketspost.service';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { MenuModule } from 'primeng/menu';
import { DatePipe, CommonModule } from '@angular/common';
import { SupportTicketsPostModel } from './supportticketspost.model';

@Component({
  selector: 'app-support-tickets',
  standalone: true,
  imports: [TableModule, FormsModule, CommonModule, SelectModule, DatePipe, MenuModule],
  templateUrl: './supportticketspost.html',
  styleUrl: './supportticketspost.css'
})
export class SupportTicketsPost implements OnInit {
  supportTickets: SupportTicketsPostModel[] = [];
  totalRecords: number = 0;
  getStatusName:any;
  loading: boolean = false;
  pageNumber = 1;
  pageSize = 10;
  searchText = '';
  totalCount = 0;
  showActivityModal = false;
  showViewModal = false;
  showDeleteModal = false;
  selectedTicket: any = null;
  ticketComments: any[] = [];
  message = '';
  messageType: 'Internal' | 'User' = 'Internal';

  statusList = [
    { id: 1, name: 'Open' },
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'Resolved' },
    { id: 4, name: 'Closed' }
  ];

  constructor(
    private router: Router,
    private service: SupportTicketPostService
  ) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  getStatusClass(statusId: number): string {
    switch (statusId) {
      case 1: return 'status-open';
      case 2: return 'status-progress';
      case 3: return 'status-resolved';
      case 4: return 'status-closed';
      default: return '';
    }
  }


  loadTickets(event?: any): void {
    this.loading = true;
    const pageNumber = event
      ? Math.floor(event.first / event.rows) + 1
      : this.pageNumber;
    const pageSize = event?.rows || this.pageSize;
    const sortField = event?.sortField || 'CreatedAt';
    const sortOrder = event?.sortOrder === 1 ? 'asc' : 'desc';
    console.log('Loading tickets:', { pageNumber, pageSize, search: this.searchText, sortField, sortOrder });
    this.service.getAdminTickets(
      pageNumber,
      pageSize,
      this.searchText,
      sortField,
      sortOrder
    ).subscribe({
      next: (res: any) => {
        console.log(' API Response:', res);
        this.supportTickets = res?.data ?? [];
        this.totalRecords = res?.totalCount ?? 0;
        this.totalCount = res?.totalCount ?? 0;
        this.loading = false;
        console.log(' Tickets loaded:', this.supportTickets.length);
      },
      error: (err) => {
        console.error(' Error loading tickets:', err);
        this.supportTickets = [];
        this.totalRecords = 0;
        this.totalCount = 0;
        this.loading = false;
      }
    });
  }

  onGlobalSearch(event: any): void {
    this.searchText = event.target.value;
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      this.loadTickets();
    }, 500);
  }

  private searchTimeout: any;
  openViewModal(ticket: any): void {
    console.log(' Opening view modal for ticket:', ticket);
    this.selectedTicket = { ...ticket };
    this.showViewModal = true;
  }

  closeViewModal(): void {
    this.showViewModal = false;
    this.selectedTicket = null;
  }


  openActivityModal(ticket: any): void {
    console.log(' Opening activity modal for ticket:', ticket);
    this.selectedTicket = { ...ticket };
    this.showActivityModal = true;
    this.loadComments();
  }

  ActivityModalClose():void{
    this.showActivityModal = false;
    this.message ='';
    this.messageType = 'Internal';
    this.ticketComments = [];
    this.selectedTicket = null;
  }
  closeActivityModal(): void {
    this.showActivityModal = false;
    this.message = '';
    this.messageType = 'Internal';
    this.ticketComments = [];
    this.selectedTicket = null;
  }

  loadComments(): void {
    if (!this.selectedTicket?.id) {
      console.error('No ticket ID for loading comments');
      return;
    }
    console.log('Loading comments for ticket:', this.selectedTicket.id);
    this.service.getComments(this.selectedTicket.id).subscribe({
      next: (res: any) => {
        this.ticketComments = res ?? [];
        console.log(' Comments loaded:', this.ticketComments.length);
      },
      error: (err) => {
        console.error(' Error loading comments:', err);
        this.ticketComments = [];
      }
    });
  }

  sendMessage(): void {
    if (!this.message || !this.message.trim()) {
      alert('Please enter a message');
      return;
    }

    if (!this.selectedTicket?.id) {
      console.error('No ticket selected');
      return;
    }

    const payload = {
      message: this.message.trim(),
      type: this.messageType
    };

    console.log('📤 Sending message:', payload);

    this.service.addComment(this.selectedTicket.id, payload).subscribe({
      next: () => {
        console.log(' Message sent');
        this.message = '';
        this.loadComments();
      },
      error: (err) => {
        console.error(' Error sending message:', err);
        alert('Failed to send message');
      }
    });
  }

  openDeleteModal(ticket: any): void {
    console.log(' Opening delete modal for ticket:', ticket);
    this.selectedTicket = { ...ticket };
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.selectedTicket = null;
  }

  confirmDeleteTicket(): void {
    if (!this.selectedTicket?.id) {
      console.error('No ticket selected for deletion');
      return;
    }

    console.log(' Deleting ticket:', this.selectedTicket.id);

    this.service.deleteTicket(this.selectedTicket.id).subscribe({
      next: () => {
        console.log(' Ticket deleted');
        alert('Ticket removed successfully');
        this.closeDeleteModal();
        this.loadTickets();
      },
      error: (err) => {
        console.error(' Error deleting ticket:', err);
        alert('Failed to remove ticket: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }


  updateStatus(ticket: any): void {
    console.log('Updating status for ticket:', ticket.id, 'to:', ticket.statusId);

    this.service.updateStatus(ticket.id, ticket.statusId).subscribe({
      next: () => {
        console.log(' Status updated');
        alert('Status updated successfully');
        this.loadTickets();
      },
      error: (err) => {
        console.error(' Status update failed:', err);
        alert('Status update failed');
        this.loadTickets();
      }
    });
  }

  goBack(): void {
    this.router.navigateByUrl('/admin/dashboard');
  }

  next(): void {
    this.pageNumber++;
    this.loadTickets();
  }

  previous(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadTickets();
    }
  }
}
