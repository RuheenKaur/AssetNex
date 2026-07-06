import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebaruser',
  imports: [RouterModule],
  templateUrl: './sidebaruser.html',
  styleUrl: './sidebaruser.css',
})
export class Sidebaruser implements OnInit {
  userId: any;
  userName: any;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.userName = this.authService.getUserName();

    if (!this.userId) {
      console.error('UserId not found — redirecting');
      this.router.navigateByUrl('/landing');
      return;
    }
  }

  onLogOut() {
    this.authService.logout();
  }

  goToAssetAssign() { this.router.navigateByUrl('user/assetassign'); }
  goToTracktickets() { this.router.navigateByUrl('user/trackticket'); }
  goToSupporttickets() { this.router.navigateByUrl('user/supporttickets'); }
  goToAssetRequest() { this.router.navigateByUrl('user/assetsrequests'); }
  getAllAssignedList() { this.router.navigateByUrl('user/assetassign'); }
  goToLanding() { this.router.navigateByUrl('/landing'); }
  goToTrackRequests() { this.router.navigate(['/user/track-requests']); }

  logout() {
    this.authService.logout();
  }
}