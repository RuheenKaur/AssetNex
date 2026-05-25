import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AssetsMasterService } from './assets-master.service';
import { SelectModule } from 'primeng/select';
import { TableModule, Table } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asset-master',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    TableModule, SelectModule, DialogModule, ButtonModule],
  templateUrl: './assets-master.component.html',
  styleUrls: ['./assets-master.component.css']
})
export class AssetsMasterComponent implements OnInit {

  @ViewChild('dt') dt!: Table;

  assets: any[] = [];
  users: any[] = [];
  selectedAsset: any = null;
  selectedUserId: number | null = null;
  showCreateModal = false;
  showEditModal = false;
  showAssignModal = false;
  newAsset: any = { assetTag: '', assetType: '', brand: '', model: '', serialNumber: '', statusId: 1 };
  newAssetErrors: any = {};
  createLoading = false;
  createError = '';
  createSuccess = false;
  editLoading = false;
  editErrors: any = {};
  editError = '';
  assignLoading = false;
  assignError = '';
  unassignLoading = false;
  loading = false;
  search = '';
  totalRecords = 0;
  pageSize = 15;
  private searchTimeout: any;

  statusList = [
  { id: 6,  name: 'InActive' },
  { id: 8,  name: 'Requested' },
  { id: 9,  name: 'Assigned' },
  { id: 10, name: 'Active' },
  {id : 3, name: 'UnderMaintenance'}
];

  constructor(
    private assetService: AssetsMasterService,
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAssets({ first: 0, rows: this.pageSize });
    this.loadUsers();
  }


  private isGibberish(value: string): boolean {
    if (!value?.trim()) return false;
    if (/^(.)\1{3,}$/.test(value.trim())) return true;
    if (/^[^a-zA-Z0-9\s\-]+$/.test(value.trim())) return true;
    return false;
  }

  private validateAssetForm(asset: any): any {
    const errors: any = {};
    const tag = asset.assetTag?.trim();
    const brand = asset.brand?.trim();
    const model = asset.model?.trim();

    if (!tag) {
      errors.assetTag = 'Asset Tag is required.';
    } else if (tag.length < 3) {
      errors.assetTag = 'Asset Tag must be at least 3 characters.';
    } else if (this.isGibberish(tag)) {
      errors.assetTag = 'Please enter a valid Asset Tag.';
    }

    if (!asset.assetType) {
      errors.assetType = 'Asset Type is required.';
    }

    if (!brand) {
      errors.brand = 'Brand is required.';
    } else if (brand.length < 2) {
      errors.brand = 'Brand must be at least 2 characters.';
    } else if (this.isGibberish(brand)) {
      errors.brand = 'Please enter a valid brand name.';
    }

    if (model && model.length < 2) {
      errors.model = 'Model must be at least 2 characters if provided.';
    } else if (model && this.isGibberish(model)) {
      errors.model = 'Please enter a valid model name.';
    }
    return errors;
  }

  onSearchChange() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.loadAssets({ first: 0, rows: this.pageSize });
    }, 400);
  }

  refreshAssets() {
    this.search = '';
    this.loadAssets({ first: 0, rows: this.pageSize });
  }

  loadUsers() {
    this.userService.getUser().subscribe({
      next: (res) => { this.users = res;
           console.log('Users loaded for dropdown:', res);
      },
      error: (err) => console.error('Users failed', err)
    });
  }



  openCreateModal() {
  this.newAsset = { assetTag: '', assetType: '', brand: '', model: '', serialNumber: '', statusId: 1 };
  this.newAssetErrors = {};
  this.createError = '';
  this.createSuccess = false;
  setTimeout(() => {
    this.showCreateModal = true;
    this.cdr.detectChanges();
  });
}

  closeCreateModal() {
    this.showCreateModal = false;
  }

  saveNewAsset() {
  console.log('newAsset:', this.newAsset);
    this.newAssetErrors = this.validateAssetForm(this.newAsset);
      console.log('validation errors:', this.newAssetErrors);
    if (Object.keys(this.newAssetErrors).length > 0) return;
    this.createLoading = true;
    this.createError = '';
    const payload = {
      assetTag: this.newAsset.assetTag.trim(),
      assetType: this.newAsset.assetType,
      brand: this.newAsset.brand.trim(),
      model: this.newAsset.model?.trim() || '',
      serialNumber: this.newAsset.serialNumber?.trim() || '',
      statusId: this.newAsset.statusId || 1,
      raM_GB: '',
      storage_GB: '',
      purchaseCost: 0,
      warrantyDate: null,
      purchaseDate: new Date().toISOString(),
      departmentId: 1
    };

    this.assetService.createAsset(payload).subscribe({
      next: () => {
        this.createLoading = false;
        this.createSuccess = true;
        setTimeout(() => {
          this.closeCreateModal();
          this.loadAssets({ first: 0, rows: this.pageSize });
        }, 800);
      },
      error: (err) => {
        this.createLoading = false;
        setTimeout(() => {
          this.createError = err.error?.message || err.error || 'Failed to create asset.';
          this.cdr.detectChanges();
        });
      }
    });
  }

  openEditModal(asset: any) {
    this.selectedAsset = { ...asset };
    this.editErrors = {};
    this.editError = '';
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedAsset = null;
  }

loadAssets(event: any) {
  this.loading = true;
  const page = event ? Math.floor(event.first / event.rows) + 1 : 1;
  const pageSize = event?.rows || this.pageSize;

  this.assetService.getAssetsPaged(page, pageSize, this.search).subscribe({
    next: (res) => {
      setTimeout(() => {
        this.assets = res.data;
        this.totalRecords = res.pagination.totalCount;
        this.loading = false;
        this.cdr.detectChanges();
      });
    },
    error: (err) => {
      console.error('Asset loading failed', err);
      this.loading = false;
    }
  });
}


  saveAssetEdits() {
  if (!this.selectedAsset) return;
  this.editErrors = this.validateAssetForm(this.selectedAsset);
  if (Object.keys(this.editErrors).length > 0) return;
  this.editLoading = true;
  this.editError = '';
  this.assetService.updateAsset(this.selectedAsset).subscribe({
    next: () => {
  this.editLoading = false;
  const found = this.assets.find(a => a.id === this.selectedAsset.id);
  if (found) {
    found.statusId = this.selectedAsset.statusId;
    found.statusName = this.statusList.find(
      s => s.id === this.selectedAsset.statusId
    )?.name || '';
  }
  this.closeEditModal();
  this.loadAssets({ first: 0, rows: this.pageSize });
},
    error: (err) => {
      this.editLoading = false;
      setTimeout(() => {
        this.editError = err.error?.message || err.error || 'Failed to update asset.';
        this.cdr.detectChanges();
      });
    }
  });
}



  updateStatus(asset: any) {
  this.assetService.updateAssetStatusOnly(asset.id, asset.statusId).subscribe({
    next: () => {

      const found = this.assets.find(a => a.id === asset.id);
      if (found) {
        found.statusId = asset.statusId;
        found.statusName = this.statusList.find(
          s => s.id === asset.statusId
        )?.name || '';
        this.cdr.detectChanges();
      }
      console.log('Status updated');
    },
    error: (err) => {
      setTimeout(() => {
        this.editError = err.error?.message || 'Status update failed.';
        this.cdr.detectChanges();
      });
    }
  });
}

  openAssignModal(asset: any) {
  console.log('FULL ASSET OBJECT:', JSON.stringify(asset));
  this.selectedAsset = { ...asset };
  this.selectedUserId = null;
  this.assignError = '';
  this.showAssignModal = true;
}

  closeAssignModal() {
    this.showAssignModal = false;
    this.selectedAsset = null;
    this.selectedUserId = null;
  }

  assignAsset() {
  console.log('Selected asset:', this.selectedAsset);
  console.log('Asset ID being sent:', this.selectedAsset?.id);
    if (!this.selectedUserId || !this.selectedAsset) return;
    this.assignLoading = true;
    this.assignError = '';

    const action = this.selectedAsset.assignedTo
      ? this.assetService.reassignAsset(this.selectedAsset.id, this.selectedUserId)
      : this.assetService.assignAsset(
          this.selectedAsset.id,
          this.selectedUserId,
          JSON.parse(localStorage.getItem('user') || '{}').numericId
        );

    action.subscribe({
      next: () => {
        this.assignLoading = false;
        this.closeAssignModal();
        this.loadAssets({ first: 0, rows: this.pageSize });
      },
      error: (err) => {
        this.assignLoading = false;
        setTimeout(() => {
          this.assignError = err.error?.message || 'Assignment failed.';
          this.cdr.detectChanges();
        });
      }
    });
  }

  unassignAsset() {
  console.log('Unassign called, selectedAsset.id =', this.selectedAsset?.id);
  if (!this.selectedAsset?.id) {
    this.assignError = 'Asset ID missing — cannot unassign.';
    return;
  }
  this.unassignLoading = true;
  this.assignError = '';
  this.assetService.unassignAsset(this.selectedAsset.id).subscribe({
    next: () => {
      this.unassignLoading = false;
      this.closeAssignModal();
      this.loadAssets({ first: 0, rows: this.pageSize });
    },
    error: (err) => {
      this.unassignLoading = false;
      setTimeout(() => {
        this.assignError = err.error?.message || 'Unassign failed.';
        this.cdr.detectChanges();
      });
    }
  });
}

  goBack() {
    this.router.navigateByUrl('/admin/dashboard');
  }
}
