import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AssetAssignService } from '../assetassign/assetassign.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboarduser',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboarduser.component.html',
  styleUrl: './dashboarduser.component.css'
})
export class DashboarduserComponent implements OnInit {

  user: any;
  userId:any;
  currentUser:any;
  userName:any;
  assets: any[] = [];
  goTo:any;

  constructor(
    private router: Router,
    private assetService: AssetAssignService,
    private authService:AuthService
  ) {}

ngOnInit()
{
  this.currentUser = JSON.parse(localStorage.getItem('user')!);
  if(!this.currentUser) return;
  this.userName= this.currentUser.email;
  this.userName = localStorage.getItem('username');

}
goToTracktickets()
{
  this.router.navigateByUrl('user/trackticket');
}

  goToLanding()
  {
    this.router.navigateByUrl('/landing');
  }

  goToLogout()
  {
    this.router.navigateByUrl('/logout');
  }


  goToSupporttickets()
  {
    this.router.navigateByUrl('user/supporttickets');
  }

  goToAssetRequest() {
    this.router.navigateByUrl('user/assetsrequests');
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
