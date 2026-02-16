import { Component, NgModule, OnInit } from '@angular/core';
import { AssetAssignService } from './assetassign.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Assetassign } from './assetassignmodel';
import { UserService } from '../user.service';
import { jwtDecode } from 'jwt-decode';

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
    private userService:UserService
  ) {}

ngOnInit(): void {
const userIdStr = localStorage.getItem('userId');
const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
this.userId= userIdStr?Number(userIdStr) : null;
this.userName = storedUser.name;
console.log('Stored user:', storedUser);
console.log('UserId used for asset API:', this.userId);
console.log('User name:', this.userName);
if(!this.userId)
{
  console.error('Numeric userId not found');
  return;
}
this.userService.getAssignedAssets(this.userId).subscribe({
  next:(res:Assetassign[])=>
  {console.log('Assigned Assets:', res)
    this.assigned = res;
  },
  error:(err) => console.error("Error loading assetes:", err),
})
}

  selectAsset(asset: Assetassign) {
    this.selectedAsset = asset;
  }

  goToSupportTickets()
  {
    this.router.navigateByUrl('user/supporttickets');
  }

  goToLanding() {
    this.router.navigateByUrl('/landing');
  }

// raiseTicket(selectedAsset: any) {
//    localStorage.setItem('ticketAsset', JSON.stringify(selectedAsset));
//   this.router.navigate(['/user/support/create'], {
//     state: {
//       Id: selectedAsset?.Id,
//       assetCategory: selectedAsset.assetCategory,
//       assetConcerned: selectedAsset.assetConcerned
//     }
//   });
// }


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

//there is a button in assetassigned raise a ticket on clicking that it should take to raise asset form where the assetconcerend
//and issue category should prefill on clicking the button', it should show the assetdetails current

//where as if form is  accessed from the sidebar menu the fields should be empty how do we do that
