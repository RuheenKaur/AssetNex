import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AssetAssignPostService } from './assetassignpost.service';
import { AssetAssignPost } from './assetassignpost.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-assetassignpost',
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule, SelectModule],
  templateUrl: './assetassignpost.html',
  styleUrl: './assetassignpost.css',
})

export class Assetassignpost implements OnInit {

  assets: AssetAssignPost[] = [];
  users: { id: number; name: string }[] = [];
  selectedAssignment: AssetAssignPost | null=null;
  selectedUserId: number | null = null;

  constructor(
    private assetassignService: AssetAssignPostService,
    private http: HttpClient,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  loggedInUserId : any;

  ngOnInit(): void {
    this.loadAssignments();
    this.loadUsers();
  }

  loadAssignments() {
    this.assetassignService.getAllAssigned()
      .subscribe(data => this.assets = data);
     this.assetassignService.getAllAssigned().subscribe(res => {
  setTimeout(() => {
    this.assets = res;
  });
}
);
  }

  loadUsers() {
    this.http.get<any[]>('https://localhost:7195/api/Users')
      .subscribe(users => {
        this.users = users.map(u => ({
          id: u.id,
          name: u.name
        }));
      });
  }

openAssignmentModal(row: any) {
  setTimeout(() => {
    this.selectedAssignment = row;
    this.selectedUserId = row.userId;
  });
}

  closeAssignmentModal() {
    this.selectedAssignment = null;
    this.selectedUserId = null;
  }

  confirmReassign() {
    if (!this.selectedAssignment || !this.selectedUserId) return;
    this.assetassignService.reassign({
      assignmentId: this.selectedAssignment.id,
      newUserId: this.selectedUserId
    }).subscribe(() => this.afterSuccess());
  }

  assignAsset() {
    if (!this.selectedAssignment || !this.selectedUserId) return;
    this.assetassignService.assignAsset(
      this.selectedAssignment.assetId,
      this.selectedUserId,
       this.loggedInUserId
    ).subscribe(() => this.afterSuccess());
  }

  unassignAsset(assignment: AssetAssignPost) {
    if (!confirm('Unassign this asset?')) return;
    this.assetassignService.unassign(assignment.id)
      .subscribe(() => this.afterSuccess());
  }

  afterSuccess() {
    this.closeAssignmentModal();
    this.loadAssignments();
  }

  goBack() {
    this.router.navigateByUrl('/admin/dashboard');
  }
}

// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// interface AssetAssignment {
//   id: number;
//   assetAssigned: string;
//   assignedOn: string;
//   returnedOn?: string | null;
//   userId: number;
// }

// interface User {
//   id: number;
//   name: string;
// }

// @Component({
//   selector: 'app-asset-assign',
//   templateUrl: './asset-assign.component.html',
//   styleUrls: ['./asset-assign.component.css']
// })
// export class AssetAssignComponent implements OnInit {

//   assets: AssetAssignment[] = [];
//   users: User[] = [];

//   selectedAssignment: AssetAssignment | null = null;
//   selectedUserId: number | null = null;

//   constructor(private router: Router) {}

//   ngOnInit(): void {
//     this.loadAssignments();
//     this.loadUsers();
//   }

//   // ---------------- DATA LOADERS ----------------

//   loadAssignments(): void {
//     // API call later
//     this.assets = [];
//   }

//   loadUsers(): void {
//     // API call later
//     this.users = [];
//   }

//   // ---------------- UI ACTIONS ----------------

//   goBack(): void {
//     this.router.navigate(['admin/dashboard']);
//   }

//   openAssignmentModal(asset: AssetAssignment): void {
//     this.selectedAssignment = asset;
//     this.selectedUserId = asset.userId;
//   }

//   closeAssignmentModal(): void {
//     this.selectedAssignment = null;
//     this.selectedUserId = null;
//   }

//   // ---------------- ASSIGN / REASSIGN ----------------

//   confirmReassign(): void {
//     if (!this.selectedAssignment || !this.selectedUserId) return;

//     const payload = {
//       assignmentId: this.selectedAssignment.id,
//       newUserId: this.selectedUserId
//     };

//     // call API here
//     this.closeAssignmentModal();
//   }

//   assignAsset(): void {
//     if (!this.selectedAssignment || !this.selectedUserId) return;

//     const payload = {
//       assignmentId: this.selectedAssignment.id,
//       userId: this.selectedUserId
//     };

//     // call API here
//     this.closeAssignmentModal();
//   }

//   // ---------------- FILTER (STRICT SAFE) ----------------

//   onGlobalFilter(event: Event, table: any): void {
//     const input = event.target as HTMLInputElement;
//     table.filterGlobal(input.value, 'contains');
//   }
// }
