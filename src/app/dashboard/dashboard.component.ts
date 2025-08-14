
 
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import {ChartModule} from 'primeng/chart';
import { InventoryService } from '../../inventory/services/inventory.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private router: Router , private inventoryService: InventoryService) {}
  assetChartData: any;
  assetChartOptions: any;
eWasteChartData: any;
eWasteChartOptions: any;

  ngOnInit() {
    
    this.assetChartData = {
      labels: ['In Use', 'Available', 'Disposed'],
      datasets: [
        {
          label: 'Asset Distribution',
          data: ['60','30','7'],
          backgroundColor: ['#ca6208', '#ffb26e', '#cf803a']
        }
      ]
    };

    this.assetChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Asset Distribution Overview'
         }
      }
    };

     this.initializeEwasteChart();
}

initializeEwasteChart() {
  this.eWasteChartData = {
    labels: ['Approved', 'Pending', 'Rejected'],
    datasets: [
      {
        data: [10,8,7], 
        backgroundColor: ['#c4a183', '#f0944c', '#da9c67'],
        hoverBackgroundColor: ['#81C784', '#FFB74D', '#E57373']
      }
    ]
  };

  this.eWasteChartOptions = {
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
          display: true,
          text: 'EWaste Overview'
         }
    },
    cutout: '',
    responsive: true,
    maintainAspectRatio: false
  };

  }
 
  goToAssets() {
    this.router.navigateByUrl('/assets'); 
  }

  goToEDispose() {
    this.router.navigateByUrl('admin/ewaste/disposable-assets');
  }

  goToSupport() {
    this.router.navigateByUrl('/assets/support');
  }

  goToSoftwareLicense() {
    this.router.navigateByUrl('/admin/software-license');
  }

  goToAbout() {
    this.router.navigateByUrl('/admin/about');
  }

  goToLanding() {
    this.router.navigateByUrl('/landing');
  }

  goToHardware()
  {
    this.router.navigateByUrl('assets/hardware');
  }

     isSidebarCollapsed = false;


  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  goTo(route: string): void
  {
    this.router.navigateByUrl(route);
  }

  }
  




