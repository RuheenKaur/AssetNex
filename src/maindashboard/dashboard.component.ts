import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  assetsInUse = 0;
  availableAssets = 0;
  pendingTickets = 0;
  totalUsers = 0;
  loading = true;

  assetChartData: any = null;
  ticketChartData: any = null;
  requestChartData: any = null;
  assetChartOptions: any = null;
  ticketChartOptions: any = null;
  requestChartOptions: any = null;

  ngOnInit(): void {
    console.log('Dashboard ngOnInit fired');
    setTimeout(() => {
      this.loadDashboardStats();
    }, 100);  // ← small delay ensures component is fully rendered
  }

  loadDashboardStats(): void {
    console.log('Loading dashboard stats...');
    this.dashboardService.getStats().subscribe({
      next: (data) => {
        console.log('Stats received:', data);
        this.assetsInUse = data.assetsInUse ?? 0;
        this.availableAssets = data.availableAssets ?? 0;
        this.pendingTickets = data.pendingTickets ?? 0;
        this.totalUsers = data.totalUsers ?? 0;
        this.loading = false;

        setTimeout(() => {
          this.initAssetChart(data.assetsInUse, data.availableAssets);
          this.initTicketChart(
            data.tickets?.open ?? 0,
            data.tickets?.inProgress ?? 0,
            data.tickets?.resolved ?? 0
          );
          this.initRequestChart(
            data.requests?.pending ?? 0,
            data.requests?.approved ?? 0,
            data.requests?.rejected ?? 0
          );
          this.cdr.detectChanges();
        }, 50);
      },
      error: (err) => {
        console.error('Dashboard stats error:', err);
        this.loading = false;
        this.assetsInUse = 0;
        this.availableAssets = 0;
        this.pendingTickets = 0;
        this.totalUsers = 0;
        this.cdr.detectChanges();
      }
    });
  }

  initAssetChart(inUse: number, available: number): void {
    this.assetChartData = {
      labels: ['Assigned', 'Active'],
      datasets: [{
        data: [inUse, available],
        backgroundColor: ['#f0842c', '#e5e7eb'],
        borderWidth: 0,
        hoverOffset: 6
      }]
    };
    this.assetChartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      cutout: '70%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { padding: 16, font: { size: 12 }, usePointStyle: true }
        },
        tooltip: { backgroundColor: 'rgba(0,0,0,0.75)', padding: 12 }
      }
    };
  }

  initTicketChart(open: number, inProgress: number, resolved: number): void {
    this.ticketChartData = {
      labels: ['Open', 'In Progress', 'Resolved'],
      datasets: [{
        data: [open, inProgress, resolved],
        backgroundColor: ['#f0842c', '#fbbf24', '#4ade80'],
        borderWidth: 0,
        hoverOffset: 6
      }]
    };
    this.ticketChartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      cutout: '70%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { padding: 16, font: { size: 12 }, usePointStyle: true }
        },
        tooltip: { backgroundColor: 'rgba(0,0,0,0.75)', padding: 12 }
      }
    };
  }

  initRequestChart(pending: number, approved: number, rejected: number): void {
    this.requestChartData = {
      labels: ['Pending', 'Approved', 'Rejected'],
      datasets: [{
        data: [pending, approved, rejected],
        backgroundColor: ['#fbbf24', '#4ade80', '#f87171'],
        borderWidth: 0,
        hoverOffset: 6
      }]
    };
    this.requestChartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      cutout: '70%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { padding: 16, font: { size: 12 }, usePointStyle: true }
        },
        tooltip: { backgroundColor: 'rgba(0,0,0,0.75)', padding: 12 }
      }
    };
  }

  getAllAssetMaster()    { this.router.navigateByUrl('/assetsmaster'); }
  getAllAssignedAssets() { this.router.navigateByUrl('admin/allassignedassets'); }
  getAllUsers()          { this.router.navigateByUrl('/users'); }
  getAllAssetHistory()   { this.router.navigateByUrl('/assethistory'); }
  getAllAssetsRequests() { this.router.navigateByUrl('/admin/asset-requests'); }
  getAllSupportTickets() { this.router.navigateByUrl('admin/supportticketspost'); }
  goToLanding()         { this.router.navigateByUrl('/landing'); }
  goTo(route: string)   { this.router.navigateByUrl(route); }
}
