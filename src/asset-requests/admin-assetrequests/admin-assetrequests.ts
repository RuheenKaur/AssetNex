
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetRequestService } from '../asset-requests.service';
import { FormsModule } from '@angular/forms';
import { AdminAssetRequest } from './adminassetrequest.model';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-assetrequests',
  imports: [CommonModule,FormsModule,TableModule,SelectModule],
  templateUrl: './admin-assetrequests.html',
  styleUrl: './admin-assetrequests.css',
})

export class AdminAssetrequests implements OnInit{

  assetRequests: AdminAssetRequest[] = [];
  loading = false;
  constructor(private assetRequestService: AssetRequestService, private cdRef: ChangeDetectorRef, private router:Router) {}


getStatusName(statusId: number): string {
  return this.statusList.find(s => s.id === statusId)?.name ?? '—';
}

getStatusClass(statusId: number): string {
  const name = this.getStatusName(statusId);
  return name
    .toLowerCase()
    .replace(/\s+/g, '-');
}

onStatusChange(req: AdminAssetRequest) {
  this.assetRequestService
    .updateStatus(req.id, req.statusId)
    .subscribe();
}

ChangeOnStatus(req:AdminAssetRequest)
{
  this.assetRequestService.updateStatus(req.id, req.statusId).subscribe();
}

statusList: { id: number; name: string }[] = [];
ngOnInit(): void {
  this.loadRequests();
  this.loadStatuses();
}

loadStatuses() {
  this.assetRequestService.getStatuses('AssetRequest')
    .subscribe(res => this.statusList = res);
}
  goBack()
  {
    this.router.navigateByUrl('/admin/dashboard');
  }

  RequestLoading()
  {
    this.loading = true;
    this.assetRequestService.getAllRequests().subscribe({
      next:(data) => {
        this.assetRequests = data;
        this.loading = false;
        console.log('ADMIN ASSET REQUESTS:', data);
      },
      error:(err)=>{
        console.error('Failed to load asset requests', err);
        this.loading = false;
      }
    })
  }


  LoadingRequests()
  {
    this.loading = true;
    this.assetRequestService.getAllRequests().subscribe({
      next:(data)=>{
    this.assetRequests = data;
    this.loading = false;
    console.log('ADMIN ASSET REQUESTS:', data);
      },
      error:(err) => {
        console.error('Failed to load asset requests', err);
        this.loading = false;
      }
    });
  }

  loadRequests() {
    this.loading = true;
    this.assetRequestService.getAllRequests().subscribe({
      next: (data) => {
        this.assetRequests = data;
        this.loading = false;
        console.log('ADMIN ASSET REQUESTS:', data);
      },
      error: (err) => {
        console.error('Failed to load asset requests', err);
        this.loading = false;
      }
    });
  }
}
