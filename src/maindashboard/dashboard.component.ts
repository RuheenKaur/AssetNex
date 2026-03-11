import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { DashboardService } from './dashboard.service';
import { SupportTicket } from '../supporttickets/supporttickets.model';
import { SupportTicketsPostModel } from '../supportticketspost/supportticketspost.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  constructor(private router: Router, private dashboardService: DashboardService) {}

  assetChartData: any;
  assetChartOptions: any;
  eWasteChartData: any;
  eWasteChartOptions: any;
  hardwareChartData: any;
  hardwareChartOptions: any;
  supportChartData: any;
  supportChartOptions: any;

  tickets: SupportTicketsPostModel[] = [];
  support: SupportTicket[] = [];
  isSidebarCollapsed = false;

  ngOnInit() {
    this.initializeAssetChart();
    this.initializeEwasteChart();
    this.initializeHardwareChart();
    this.initializeSupportChart();
  }

  // ============================================
// CHART 1: ASSET DISTRIBUTION (ORANGE THEME)
// ============================================
initializeAssetChart() {
  this.assetChartData = {
    labels: ['In Use', 'Available', 'Disposed'],
    datasets: [{
      label: 'Asset Status',
      data: [60, 30, 7],
      backgroundColor: [
        '#FF8C42',  // Bright Orange
        '#FFB366',  // Light Orange
        '#E67A2E'   // Dark Orange
      ],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };

  this.assetChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: { size: 12 }
        }
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12
      }
    }
  };
}

// ============================================
// CHART 2: E-WASTE (ORANGE THEME)
// ============================================
initializeEwasteChart() {
  this.eWasteChartData = {
    labels: ['Approved', 'Pending', 'Rejected'],
    datasets: [{
      label: 'E-Waste Status',
      data: [10, 8, 7],
      backgroundColor: [
        '#F4A460',  // Sandy Orange (approved)
        '#FFB74D',  // Golden Orange (pending)
        '#FF7043'   // Red-Orange (rejected)
      ],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };

  this.eWasteChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: { size: 12 }
        }
      },
      title: {
        display: false
      }
    }
  };
}

// ============================================
// CHART 3: HARDWARE (ORANGE THEME - BAR CHART)
// ============================================
initializeHardwareChart() {
  this.hardwareChartData = {
    labels: ['In-Use', 'Dysfunctional', 'Rejected'],
    datasets: [{
      label: 'Hardware Status',
      data: [200, 15, 24],
      backgroundColor: [
        '#C8997A',  // Brown-Orange
        '#FF8A80',  // Coral-Orange
        '#FFA666'   // Peach-Orange
      ],
      borderWidth: 1,
      borderColor: '#E1E8ED'
    }]
  };

  this.hardwareChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#E1E8ED'
        },
        ticks: {
          font: { size: 11 }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: { size: 11 }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12
      }
    }
  };
}

initializeSupportChart() {
  this.supportChartData = {
    labels: ['Renewal', 'Outdated', 'Expired'],
    datasets: [{
      label: 'Support Status',
      data: [50, 20, 32],
      backgroundColor: [
        '#FFB84D',
        '#FF9966',  // Tangerine
        '#E67E50'   // Burnt Orange
      ],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };

  this.supportChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: { size: 12 }
        }
      },
      title: {
        display: false
      }
    }
  };
}

  // ============================================
  // NAVIGATION METHODS (unchanged)
  // ============================================
  getAllAssetMaster() {
    this.router.navigateByUrl('/assetsmaster');
  }

  getAllAssignedAssets() {
    this.router.navigateByUrl('admin/allassignedassets');
  }

  getAllUsers() {
    this.router.navigateByUrl('/users');
  }

  getAllAssetSoftware() {
    this.router.navigateByUrl('/assetsoftware');
  }

  goToLanding() {
    this.router.navigateByUrl('/landing');
  }

  getAllAssetHistory() {
    this.router.navigateByUrl('/assethistory');
  }

  getAllAssetsRequests() {
    this.router.navigateByUrl('/admin/asset-requests');
  }

  getAllSupportTickets() {
    this.router.navigateByUrl('admin/supportticketspost');
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  goTo(route: string): void {
    this.router.navigateByUrl(route);
  }
}
