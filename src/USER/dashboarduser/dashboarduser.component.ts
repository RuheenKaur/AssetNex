
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-dashboarduser',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboarduser.component.html',
  styleUrl: './dashboarduser.component.css'
})
export class DashboarduserComponent implements OnInit {

  userName = 'User';
  userId: any = null;
  myAssetsCount = 0;
  pendingRequests = 0;
  openTickets = 0;
  recentAssets: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}
  
  ngOnInit() {
  this.userName = this.authService.getUserName() || this.authService.getEmail() || 'User';
  this.userId = this.authService.getNumericId();
  this.loadDashboardData();
}

  loadDashboardData() {
    if (!this.userId) return;

    forkJoin({
      assets: this.http.get<any[]>(
        `${environment.apibaseUrl}/api/AssetAssignments/user/${this.userId}`
      ),
      requests: this.http.get<any[]>(
        `${environment.apibaseUrl}/api/AssetRequests/user/${this.userId}`
      ),
      tickets: this.http.get<any[]>(
        `${environment.apibaseUrl}/api/support-tickets/user/${this.userId}`
      )
    }).subscribe({
      next: ({ assets, requests, tickets }) => {
        setTimeout(() => {
          this.myAssetsCount = assets?.length || 0;
          this.pendingRequests = requests?.filter(
            (r: any) => r.statusId === 11
          ).length || 0;
          this.openTickets = tickets?.filter(
            (t: any) => t.statusName === 'Open'
          ).length || 0;
          this.recentAssets = (assets || []).map((a: any) => ({
            name: `${a.brand} ${a.model}`,
            type: a.assetType || 'Hardware',
            assignedDate: a.assignedOn,
            serialNumber: a.assetTag || '-'
          }));
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        console.error('Dashboard load failed', err);
      }
    });
  }

  goToAssetRequest() { this.router.navigateByUrl('user/assetsrequests'); }
  goToSupporttickets() { this.router.navigateByUrl('user/supporttickets'); }
  goToTracktickets() { this.router.navigateByUrl('user/trackticket'); }
  logout() { localStorage.clear(); this.router.navigateByUrl('/login'); }
  goToLanding() { this.router.navigateByUrl('/landing'); }
}
