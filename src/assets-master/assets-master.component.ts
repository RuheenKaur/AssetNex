import { Component, OnInit, ViewChild } from '@angular/core';
import { AssetsMasterService } from './assets-master.service';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Table } from 'primeng/table';
import { UserService } from '../user.service';
import { AssetMaster } from './asset-master.model';

@Component({
  selector: 'app-asset-master',
  imports: [SelectModule, FormsModule, ReactiveFormsModule, CommonModule, TableModule],
  templateUrl: './assets-master.component.html',
  styleUrls: ['./assets-master.component.css']
})
export class AssetsMasterComponent implements OnInit {
  @ViewChild('dt') dt!: Table;

  assets: AssetMaster[] = [];
  selectedAsset: any = null;
  showAssignModal = false;
  users: any[] = [];
  totalRecords = 0;
  search = '';
  selectedUserId: number | null = null;
  showEditModal = false;
  selectedStatus: number | null = null;
  loading = false;
  pageNumber = 1;
  pageSize = 10;
  totalCount = 0;

  private searchTimeout: any;

  statusList = [
    { id: 1, name: 'Available' },
    { id: 2, name: 'Assigned' },
    { id: 3, name: 'In Repair' },
    { id: 4, name: 'Resolved' },
    { id: 5, name: 'Closed' }
  ];

  constructor(
    private assetService: AssetsMasterService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadAssets({ first: 0, rows: 10 });
    this.loadUsers();
  }

  onSearchChange() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      console.log('Searching for:', this.search);
      this.loadAssets({ first: 0, rows: this.pageSize });
    }, 500);
  }

  refreshAssets() {
    this.search = '';
    this.selectedStatus = null;
    this.loadAssets({ first: 0, rows: this.pageSize });
  }

  loadUsers() {
    this.userService.getUser().subscribe({
      next: res => {
        this.users = res;
        console.log('Users loaded:', this.users.length);
      },
      error: err => {
        console.error('Users load failed', err);
        alert('Failed to load users');
      }
    });
  }

  loadAssets(event: any) {
    this.loading = true;

    const page = event ? Math.floor(event.first / event.rows) + 1 : this.pageNumber;
    const pageSize = event?.rows || this.pageSize;

    console.log('Loading assets - Page:', page, 'Size:', pageSize, 'Search:', this.search);

    this.assetService.getAssetsPaged(page, pageSize, this.search).subscribe({
      next: (res) => {
        console.log('API Response:', res);
        this.assets = res.data;
        this.totalRecords = res.pagination.totalCount;
        this.totalCount = res.pagination.totalCount;
        this.loading = false;
        console.log('Assets loaded:', this.assets.length);
      },
      error: (err) => {
        console.error('Asset loading failed', err);
        this.loading = false;
        alert('Failed to load assets');
      }
    });
  }

  filterByStatus() {
    if (!this.selectedStatus) {
      this.loadAssets({ first: 0, rows: this.pageSize });
      return;
    }
    this.assets = this.assets.filter(a => a.statusId === this.selectedStatus);
  }

  openEditModal(asset: any) {
    this.selectedAsset = { ...asset };
    this.showEditModal = true;
    console.log('Editing asset:', this.selectedAsset);
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedAsset = null;
  }

  saveAssetEdits() {
    if (!this.selectedAsset) return;

    console.log('Saving asset:', this.selectedAsset);

    this.assetService.updateAsset(this.selectedAsset.assetId).subscribe({
      next: (response) => {
        console.log('Asset updated:', response);
        alert('Asset updated successfully');
        this.closeEditModal();
        this.loadAssets({ first: 0, rows: this.pageSize });
      },
      error: (err) => {
        console.error('Update failed:', err);
        alert('Update failed: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }

  updateStatus(asset: any) {
    console.log('Updating status for asset:', asset.assetId, 'to status:', asset.statusId);

    this.assetService.updateAssetStatus(asset.assetId, asset.statusId).subscribe({
      next: (response) => {
        console.log('Status updated:', response);
        alert('Status updated successfully');
        this.loadAssets({ first: 0, rows: this.pageSize });
      },
      error: (err) => {
        console.error('Status update failed:', err);
        alert('Status update failed: ' + (err.error?.message || 'Unknown error'));

        this.loadAssets({ first: 0, rows: this.pageSize });
      }
    });
  }

  openAssignModal(asset: any) {
    this.selectedAsset = asset;
    this.showAssignModal = true;
    console.log('Assigning asset:', this.selectedAsset);
  }

  closeAssignModal() {
    this.showAssignModal = false;
    this.selectedAsset = null;
    this.selectedUserId = null;
  }

  assignAsset() {
    if (!this.selectedUserId || !this.selectedAsset) {
      alert("Please select a user");
      return;
    }

    console.log("Assigning asset", this.selectedAsset.assetId, "to user", this.selectedUserId);

    this.assetService.assignAsset(this.selectedAsset.assetId, this.selectedUserId, this.selectedAsset).subscribe({
      next: (response:any) => {
        console.log('Asset assigned:', response);
        alert('Asset assigned successfully');
        this.closeAssignModal();
        this.loadAssets({ first: 0, rows: this.pageSize });
      },
      error: (err:any) => {
        console.error('Assignment failed:', err);
        alert('Assignment failed: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }
}
