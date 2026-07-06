import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AssetAssignPostService } from './assetassignpost.service';
import { AssetAssignPost } from './assetassignpost.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-assetassignpost',
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule, SelectModule, DialogModule],
  templateUrl: './assetassignpost.html',
  styleUrl: './assetassignpost.css',
})
export class Assetassignpost implements OnInit {

  assets: AssetAssignPost[] = [];
  users: { id: number; name: string }[] = [];
  selectedAssignment: AssetAssignPost | null = null;
  selectedUserId: number | null = null;
  showModal = false;
  loggedInUserId: any;

  constructor(
    private assetassignService: AssetAssignPostService,
    private http: HttpClient,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAssignments();
    this.loadUsers();
  }

  loadAssignments(): void {
    this.assetassignService.getAllAssigned().subscribe({
      next: (data) => {
        this.assets = data;
        this.cdRef.detectChanges();
      },
      error: (err) => console.error('Failed to load assignments', err)
    });
  }

  loadUsers(): void {
    this.http.get<any[]>('https://localhost:7195/api/Users').subscribe({
      next: (users) => {
        this.users = users.map(u => ({ id: u.id, name: u.name }));
      },
      error: (err) => console.error('Failed to load users', err)
    });
  }

  refreshAssignments(): void {
    this.loadAssignments();
  }

  openAssignmentModal(row: AssetAssignPost): void {
    this.selectedAssignment = row;
    this.selectedUserId = row.userId ?? null;
    this.showModal = true;
  }

  closeAssignmentModal(): void {
    this.selectedAssignment = null;
    this.selectedUserId = null;
    this.showModal = false;
  }
  
  confirmReassign(): void {
    if (!this.selectedAssignment || !this.selectedUserId) return;
    this.assetassignService.reassign({
      assignmentId: this.selectedAssignment.id,
      newUserId: this.selectedUserId
    }).subscribe({
      next: () => this.afterSuccess(),
      error: (err) => console.error('Reassign failed', err)
    });
  }

  assignAsset(): void {
    if (!this.selectedAssignment || !this.selectedUserId) return;
    this.assetassignService.assignAsset(
      this.selectedAssignment.assetId,
      this.selectedUserId,
      this.loggedInUserId
    ).subscribe({
      next: () => this.afterSuccess(),
      error: (err) => console.error('Assign failed', err)
    });
  }

  afterSuccess(): void {
    this.closeAssignmentModal();
    this.loadAssignments();
  }

  goToDashboard(): void {
    this.router.navigateByUrl('/admin/dashboard');
  }
}
