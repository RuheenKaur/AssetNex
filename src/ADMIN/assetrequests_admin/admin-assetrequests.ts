import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetRequestService } from '../../USER/asset-requests/asset-requests.service';
import { FormsModule } from '@angular/forms';
import { AdminAssetRequest } from './adminassetrequest.model';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-assetrequests',
  imports: [CommonModule, FormsModule, TableModule, SelectModule, DialogModule],
  templateUrl: './admin-assetrequests.html',
  styleUrl: './admin-assetrequests.css',
})
export class AdminAssetrequests implements OnInit {

  assetRequests: AdminAssetRequest[] = [];
  loading = false;
  statusList: { id: number; name: string }[] = [];
  showDialog = false;
  selectedRequest: AdminAssetRequest | null = null;
  selectedStatusId: number = 0;
 adminNotes: string = '';
  constructor(
    private assetRequestService: AssetRequestService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRequests();
    this.loadStatuses();
  }

  loadRequests() {
    this.loading = true;
    this.assetRequestService.getAllRequests().subscribe({
      next: (data) => {
        this.assetRequests = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load asset requests', err);
        this.loading = false;
      }
    });
  }

loadStatuses() {
  this.assetRequestService.getStatuses('AssetRequest')
    .subscribe(res => this.statusList = res);
}


  getStatusName(statusId: number): string {
    return this.statusList.find(s => s.id === statusId)?.name ?? '—';
  }

  getStatusClass(statusId: number): string {
    return this.getStatusName(statusId).toLowerCase().replace(/\s+/g, '-');
  }

  onStatusChange(req: AdminAssetRequest) {
    this.assetRequestService.updateStatus(req.id, req.statusId).subscribe();
  }



openEditDialog(req: AdminAssetRequest) {
  this.selectedRequest = { ...req };
  this.selectedStatusId = req.statusId;
  this.adminNotes = req.adminNotes || '';  // ← load existing notes
  this.showDialog = true;
}

saveStatus() {
  if (!this.selectedRequest) return;
  this.assetRequestService.updateRequestReview(
    this.selectedRequest.id,
    this.selectedStatusId,
    this.adminNotes
  ).subscribe({
    next: () => {
      const row = this.assetRequests.find(r => r.id === this.selectedRequest!.id);
      if (row) {
        row.statusId = this.selectedStatusId;
        row.adminNotes = this.adminNotes;  // ← update local data
        this.cdRef.detectChanges();
      }
      this.showDialog = false;
      this.selectedRequest = null;
      this.adminNotes = '';
    },
    error: (err) => {
      alert('Failed to update: ' + (err.error?.message || err.message));
    }
  });
}


  closeDialog() {
    this.showDialog = false;
    this.selectedRequest = null;
  }

  goBack() {
    this.router.navigateByUrl('/admin/dashboard');
  }
}
