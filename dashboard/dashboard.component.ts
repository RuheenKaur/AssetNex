

import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import {ChartModule} from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports:[FormsModule, RouterModule,CommonModule,ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent{
  constructor(private router: Router ) {}
  assetChartData: any;
  assetChartOptions: any;
eWasteChartData: any;
eWasteChartOptions: any;
hardwareChartData:any;
hardwareChartOptions:any;
supportChartData:any;
supportChartOptions:any;


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
   this.initializeHardwareChart();
};

initializeHardwareChart()
{
  this.hardwareChartData = {
    labels: ['In-Use', 'Dysfunctional', 'Rejected'],
    datasets: [
      {
        data: [200,15,24],
        backgroundColor: ['#c5a183', '#f0947c', '#ed9c67'],
        hoverBackgroundColor: ['#81C784', '#FFB74D', '#E57373']
      }
    ]
  };

  this.hardwareChartOptions = {
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
          display: true,
          text: 'Hardware Overview'
         }
    },
    cutout: '',
    responsive: true,
    maintainAspectRatio: false
  };

  this.initializeSupportChart();
}

initializeSupportChart()
{
  this.supportChartData={
  labels : ['Renewal','Outdated', 'Expired'],
  dataSets: [{

    data:['50','20','32'],
    backgroundColor:['#c5a434', '#f8c545', '#c7c567'],
    hoverbackgroundColor:['#f8a545', '#d2c567', '#d3a787'],
  }]
};

this.supportChartOptions={
  plugins:{
    legend:{
      position:'top'
    },
    title:{
      display:true,
      text:'Support Overview',
    }
  },

  cutout:'',
  responsive:true,
  maintainAspectRatio:false,

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

  goToLiveTracking()
  {
    this.router.navigateByUrl('/livetracking')
  }
  goToHardware()
  {
    this.router.navigateByUrl('assets/hardware');
  }

  goToHelpPage()
  {
    this.router.navigateByUrl('helppage');
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





