import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AssetRequestService } from '../asset-requests/asset-requests.service';
import { TrackRequestModel } from './trackrequests.model';
@Component({
  selector: 'app-track-requests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trackrequests.html',
  styleUrls: ['./trackrequests.css']
})
export class TrackRequestsComponent implements OnInit {

  requests: any[] = [];
  filteredRequests: any[] = [];
  loading = false;
  error = '';
  searchTerm = '';

  constructor(
    private requestService: AssetRequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.numericId;
    if (!userId) { this.error = 'User not found. Please log in again.'; return; }

    this.loading = true;
    this.error = '';

    this.requestService.getMyRequests(userId).subscribe({
      next: (res) => {
        this.requests = res;
        this.filteredRequests = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load requests. Please try again.';
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredRequests = this.requests.filter(r =>
      r.assetType?.toLowerCase().includes(term) ||
      r.reason?.toLowerCase().includes(term) ||
      this.getStatusLabel(r.statusId).toLowerCase().includes(term)
    );
  }

  getStatusLabel(statusId: number): string {
    const map: any = { 11: 'Pending', 12: 'Approved', 13: 'Rejected' };
    return map[statusId] || 'Unknown';
  }

  getStatusBadgeClass(statusId: number): string {
    const map: any = { 11: 'badge-pending', 12: 'badge-approved', 13: 'badge-rejected' };
    return map[statusId] || '';
  }

  getRequestCardClass(statusId: number): string {
    const map: any = { 11: 'status-pending', 12: 'status-approved', 13: 'status-rejected' };
    return map[statusId] || '';
  }

  goBack(): void {
    this.router.navigate(['/user/dashboard']);
  }
}
