import { Component, NgModule, OnInit } from '@angular/core';
import { AssetAssignService } from './assetassign.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Assetassign } from './assetassignmodel';
import { UserService } from '../../ADMIN/user-master/user.service';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-assetassign',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  providers:[DatePipe],
  templateUrl: './assetassign.component.html',
  styleUrls: ['./assetassign.component.css']
})

export class AssetassignComponent implements OnInit {
  selectedAsset: Assetassign | null = null;
  name!:string;
  goTo:any;
  userName:any;
  userId:any;
  currentUserId:any;
  assetId:any;
  currentUserName:any;
  assigned:Assetassign[]=[];
  successMessage ="Support ticket raised successfully";

  constructor(
    private assetAssignService: AssetAssignService,
    private router: Router,
    private userService:UserService,
    private authService : AuthService
  ) {}

  ngOnInit(): void {
  this.userName = this.authService.getUserName() || this.authService.getEmail() || 'User';
  this.userId = this.authService.getNumericId();

  if (!this.userId) {
    console.error('Numeric userId not found — redirecting');
    return;
  }

  this.userService.getAssignedAssets(this.userId).subscribe({
    next: (res: Assetassign[]) => {
      this.assigned = res;
    },
    error: (err) => console.error('Error loading assets:', err)
  });
}

  selectAsset(asset: Assetassign) {
    this.selectedAsset = asset;
  }

  goToSupportTickets()
  {
    this.router.navigateByUrl('user/supporttickets');
  }

  goBack()
  {
    this.router.navigateByUrl('/user/dashboard');
  }

  loadTickets()
  {

  }
  goToLanding() {
    this.router.navigateByUrl('/landing');
  }

raiseTicket(selectedAsset: any) {
  console.log('Raising ticket for asset:', selectedAsset);
  this.router.navigate(['/user/supporttickets'], {
    state: {
      assetId: selectedAsset.assetId,
      assetTag: selectedAsset.assetTag,
      assetConcerned:selectedAsset.assetType,
      assetCategory: this.determineCategory(selectedAsset.assetType)
    }
  });
}

private determineCategory(assetType: string): string {
  const type = assetType?.toLowerCase() || '';

  if (type.includes('laptop') || type.includes('desktop') ||
      type.includes('monitor') || type.includes('mouse') ||
      type.includes('keyboard')) {
    return 'Hardware';
  }
  if (type.includes('router') || type.includes('switch')) {
    return 'Network';
  }
  return 'Software';
}
}

