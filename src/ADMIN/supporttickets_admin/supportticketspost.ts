

import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { TableModule } from 'primeng/table';
import { SupportTicketPostService } from './supportticketspost.service';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import {DialogModule} from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { DatePipe, CommonModule } from '@angular/common';
import { SupportTicketsPostModel } from './supportticketspost.model';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-support-tickets',
  standalone: true,
  imports: [TableModule, DialogModule,FormsModule,CommonModule, SelectModule, DatePipe, MenuModule],
  templateUrl: './supportticketspost.html',
  styleUrl: './supportticketspost.css'
})
export class SupportTicketsPost implements OnInit, OnDestroy {
  supportTickets: SupportTicketsPostModel[] = [];
  totalRecords: number = 0;
  isNavigating = false;
  loading: boolean = false;
  pageNumber = 1;
  pageSize = 10;
  activityModalVisible = false;
  searchText = '';
  totalCount = 0;
  showActivityModal = false;
  showViewModal = false;
  showDeleteModal = false;
  selectedTicket: any = null;
  ticketComments: any[] = [];
  message = '';
  messageType: 'Internal' | 'User' = 'Internal';
  private searchTimeout: any;
  private routerSub!: Subscription;


  statusList = [
    { id: 1, name: 'Open' },
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'Resolved' },
    { id: 4, name: 'Closed' }
  ];


  constructor(
    private router: Router,
    private service: SupportTicketPostService,
    private route: ActivatedRoute,
    private cdf: ChangeDetectorRef
  ) {}




ngOnInit(): void {

  this.routerSub = this.router.events.subscribe(event => {
    if (event instanceof NavigationStart) {
      this.isNavigating = true;
    }
    if (event instanceof NavigationEnd) {
      this.isNavigating = false;
    }
  });

  this.loadTickets({ first: 0, rows: this.pageSize, sortField: 'CreatedAt', sortOrder: -1 });
}

refreshTickets() {
  this.loadTickets({
    first: 0,
    rows: this.pageSize
  });
}
  ngOnDestroy(): void {
    if (this.routerSub) this.routerSub.unsubscribe();
  }

  getStatusName(statusId: number): string {
    return this.statusList.find(s => s.id === statusId)?.name || 'Unknown';
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
  if (this.loading) return;
  this.loading = true;
  const pageNumber = event
    ? Math.floor(event.first / event.rows) + 1
    : this.pageNumber;
  const pageSize = event?.rows || this.pageSize;
  const sortField = event?.sortField || 'CreatedAt';
  const sortOrder =
    event?.sortOrder === 1 ? 'asc' : 'desc';
  this.service.getAdminTickets(
    pageNumber,
    pageSize,
    this.searchText,
    sortField,
    sortOrder
  )
  .subscribe({
    next: (res: any) => {
      this.supportTickets = res?.data ?? [];
      this.totalRecords =
        res?.pagination?.totalCount
        ?? res?.totalCount
        ?? 0;
      this.totalCount = this.totalRecords;
      console.log(
        'Tickets loaded:',
        this.supportTickets.length
      );
      setTimeout(() => {
  this.loading = false;
  this.cdf.detectChanges();
});
    },
    error: (err) => {
      console.error(
        'Error loading tickets:',
        err
      );
      this.supportTickets = [];
      this.totalRecords = 0;
      this.loading = false;
      this.cdf.detectChanges(); 
    }
  });
}

  onGlobalSearch(event: any): void {
    this.searchText = event.target.value;
    if (this.searchTimeout) clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.loadTickets();
    }, 500);
  }

  openViewModal(ticket: any): void {
    this.selectedTicket = { ...ticket };
    this.showViewModal = true;
  }

  closeViewModal(): void {
    this.showViewModal = false;
    this.selectedTicket = null;
  }


  openActivityModal(ticket: any): void {
  console.log('BUTTON CLICK WORKING', ticket);
  this.selectedTicket = ticket;
  this.activityModalVisible = true;
  this.loadComments(ticket.id);

}

closeActivityModal(): void {
  this.activityModalVisible = false;
  this.message = '';
  this.messageType = 'Internal';
  this.ticketComments = [];
  this.selectedTicket = null;
}

updateStatus(ticket: any): void {
  this.service.updateStatus(ticket.id, ticket.statusId).subscribe({
    next: () => {
      console.log('Status updated successfully');
    },
    error: (err) => {
      console.error('Status update failed:', err);
    }
  });
}

loadComments(ticketId: number): void {
  this.ticketComments = [];
  this.service.getComments(ticketId).subscribe({
    next: (data) => {
      this.ticketComments = data ?? [];
      this.cdf.detectChanges();
    },
    error: (err) => {
      console.error('Comments failed', err);
      this.ticketComments = [];
    }
  });
}

  sendMessage(): void {
  if (!this.message?.trim() || !this.selectedTicket?.id) return;

  const payload = {
    message: this.message.trim(),
    type: this.messageType
  };

  this.service.addComment(this.selectedTicket.id, payload).subscribe({
    next: () => {
      this.message = '';
      this.loadComments(this.selectedTicket.id);
    },
    error: (err) => {
      console.error('Error sending message:', err);
    }
  });
}

  openDeleteModal(ticket: any): void {
    this.selectedTicket = { ...ticket };
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.selectedTicket = null;
  }

  confirmDeleteTicket(): void {
    if (!this.selectedTicket?.id) return;
    this.service.deleteTicket(this.selectedTicket.id).subscribe({
      next: () => {
        this.closeDeleteModal();
        this.loadTickets();
        console.log(' Ticket deleted');
      },
      error: (err) => {
        console.error(' Error deleting ticket:', err);
        alert('Failed to delete ticket: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }
saveResolutionNotes(): void {
  if (!this.selectedTicket?.id) return;

  this.service.updateResolutionNotes(
    this.selectedTicket.id,
    this.selectedTicket.resolutionNotes
  ).subscribe({
    next: () => {
      console.log('Resolution notes saved');
    },
    error: (err) => {
      console.error('Failed to save notes:', err);
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
