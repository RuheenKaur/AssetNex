import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AssetAssignService } from '../assetassign/assetassign.service';
import { AuthService } from '../auth/auth.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-dashboarduser',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboarduser.component.html',
  styleUrl: './dashboarduser.component.css'
})
export class DashboarduserComponent implements OnInit {

    constructor(
    private router: Router,
    private assetService: AssetAssignService,
    private authService:AuthService
  ) {}

  userName: string = 'User';
  myAssetsCount: number = 0;
  pendingRequests: number = 0;
  openTickets: number = 0;
  recentAssets: any[] = [
    {
      name: 'Dell Latitude 5420',
      type: 'Laptop',
      assignedDate: 'Jan 15, 2026',
      serialNumber: 'LT-2024-001'
    },

    {
      name: 'HP Monitor 24"',
      type: 'Monitor',
      assignedDate: 'Jan 15, 2026',
      serialNumber: 'MN-2024-045'
    }
  ];

  ngOnInit() {
    this.loadDashboardData();
    this.currentUser = JSON.parse(localStorage.getItem('user')!);
  if(!this.currentUser) return;
  this.userName= this.currentUser.name;
  this.userId = this.currentUser.id;
  console.log('Current user:', this.currentUser);
  console.log('UserId for asset API:', this.userId);
  console.log('User name:', this.userName);
  }

  loadDashboardData() {
    this.myAssetsCount = this.recentAssets.length;
    this.pendingRequests = 2;
    this.openTickets = 1;
  }

  goToAssetAssign() {
    this.router.navigateByUrl('user/assetassign');
  }

  goToAssetRequest() {
  this.router.navigateByUrl('user/assetsrequests');
  }

  goToSupporttickets() {
  this.router.navigateByUrl('user/supporttickets');
  }

  goToTracktickets() {
    this.router.navigateByUrl('user/trackticket');
  }

  onLogOut() {

  }

user: any;
userId:any;
currentUser:any;
assets: any[] = [];
totalUsers:number = 0;
totalAssets:number = 0;
softwareCount:number = 0;
hardwareCount:number = 0;
departmentCount :number = 0;
historyCount: number = 0;
goTo:any;
assignedCount: number = 0;
roleCount: number = 0;
isSidebarCollapsed = false;


  goToLanding()
  {
    this.router.navigateByUrl('/landing');
  }

getAllAssignedList()
{
  this.router.navigateByUrl('user/assetassign');
}

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }


}
