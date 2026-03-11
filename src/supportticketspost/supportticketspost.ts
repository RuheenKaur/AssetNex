

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { TableModule } from 'primeng/table';
import { SupportTicketPostService } from './supportticketspost.service';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { MenuModule } from 'primeng/menu';
import { DatePipe, CommonModule } from '@angular/common';
import { SupportTicketsPostModel } from './supportticketspost.model';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-support-tickets',
  standalone: true,
  imports: [TableModule, FormsModule, CommonModule, SelectModule, DatePipe, MenuModule],
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
    private route: ActivatedRoute
  ) {}

//   ngOnInit(): void {
//   // Critical data from resolver
//   const assets = this.route.snapshot.data['assets'];
//   this.assets = assets.data;

//   // Secondary data — load in parallel, don't block
//   this.loadStatusList();
//   this.loadUsers();
//   this.loadDepartments();
// }

// loadStatusList() {
//   this.service.getStatuses().subscribe(res => this.statusList = res);
// }

// ngOnInit(): void {
//   // All secondary data fired simultaneously
//   // none blocking the other
//   forkJoin({
//     statuses: this.service.getStatuses(),
//     users: this.service.getUsers(),
//     departments: this.service.getDepartments()
//   }).subscribe(({ statuses, users, departments }) => {
//     this.statusList = statuses;
//     this.users = users;
//     this.departments = departments;
//   });
// }

  ngOnInit(): void {
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) this.isNavigating = true;
      if (event instanceof NavigationEnd) this.isNavigating = false;
    });

    const data = this.route.snapshot.data['tickets'];
    console.log('=> Resolver started --fetching before route loads');
    console.log('-> component loaded');
    console.log('Data from resolver:' ,data);
    
    if (data?.data) {
      this.supportTickets = data.data;
      this.totalRecords = data.pagination?.totalCount ?? data.totalCount ?? 0;
    } else {
      this.loadTickets();
    }
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
    this.loading = true;
    const pageNumber = event
      ? Math.floor(event.first / event.rows) + 1
      : this.pageNumber;
    const pageSize = event?.rows || this.pageSize;
    const sortField = event?.sortField || 'CreatedAt';
    const sortOrder = event?.sortOrder === 1 ? 'asc' : 'desc';

    this.service.getAdminTickets(
      pageNumber, pageSize, this.searchText, sortField, sortOrder
    ).subscribe({
      next: (res: any) => {
        this.supportTickets = res?.data ?? [];
        this.totalRecords = res?.pagination?.totalCount ?? res?.totalCount ?? 0;
        this.totalCount = this.totalRecords;
        this.loading = false;
        console.log('Tickets loaded:', this.supportTickets.length);
      },
      error: (err) => {
        console.error(' Error loading tickets:', err);
        this.supportTickets = [];
        this.totalRecords = 0;
        this.loading = false;
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
    this.selectedTicket = { ...ticket };
    this.showActivityModal = true;
    this.loadComments();
  }

  closeActivityModal(): void {
    this.showActivityModal = false;
    this.message = '';
    this.messageType = 'Internal';
    this.ticketComments = [];
    this.selectedTicket = null;
  }

  loadComments(): void {
    if (!this.selectedTicket?.id) return;
    this.service.getComments(this.selectedTicket.id).subscribe({
      next: (res: any) => {

        this.ticketComments = (res ?? []).map((c: any) => ({
          ...c,
          message: c.message || c.comment || c.Comment || ''
        }));
        console.log(' Comments loaded:', this.ticketComments.length);
      },
      error: (err) => {
        console.error(' Error loading comments:', err);
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
        this.loadComments();
        console.log(' Message sent');
      },
      error: (err) => {
        console.error(' Error sending message:', err);
        alert('Failed to send message');
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

  updateStatus(ticket: any): void {
    this.service.updateStatus(ticket.id, ticket.statusId).subscribe({
      next: () => {
        console.log('Status updated');
        this.loadTickets();
      },
      error: (err) => {
        console.error(' Status update failed:', err);
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
