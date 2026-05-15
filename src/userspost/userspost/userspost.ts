import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';
import { Router } from '@angular/router';
import { UserPostService } from '../userspost.service';
import { UserspostModel } from './userspost.model';
import { Assetassign } from '../../assetassign/assetassignmodel';

@Component({
  selector: 'app-userspost',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, DialogModule,
    ButtonModule, InputTextModule, SelectModule, TooltipModule],
  templateUrl: './userspost.html',
  styleUrl: './userspost.css',
})
export class UsersPost implements OnInit {

  users: UserspostModel[] = [];
  loading = false;

  selectedUser: any = null;
  assignedAssets: Assetassign[] = [];
  loadingAssignments = false;

  showUserAssignmentModal = false;
  showEditModal = false;
  showDeactivateModal = false;
  showCreateModal = false;

  // new user form
  newUser: any = { name: '', email: '', contact: '', role: 'User' };
  createLoading = false;
  createError = '';
  createSuccess = false;
  editLoading = false;
  editError = '';

  constructor(
    private userpostService: UserPostService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userpostService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data ?? [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load users', err);
        this.loading = false;
      }
    });
  }

  reloadUsers(): void {
    this.loadUsers();
  }


  openCreateModal(): void {
    this.newUser = { name: '', email: '', contact: '', role: 'User' };
    this.createError = '';
    this.createSuccess = false;
    this.showCreateModal = true;
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
  }



  saveNewUser(): void {
  if (!this.newUser.name || !this.newUser.email) {
    this.createError = 'Name and Email are required.';
    return;
  }
  this.createLoading = true;
  this.createError = '';

  this.userpostService.createUser(this.newUser).subscribe({
    next: (res) => {
      console.log('User created:', res);
      this.createLoading = false;
      this.createSuccess = true;
      setTimeout(() => {
        this.closeCreateModal();
        this.loadUsers();
      }, 800);
    },
    error: (err) => {
      console.error('Create user error:', err);
      this.createLoading = false;
      setTimeout(() => {
        if (typeof err.error === 'string') {
          this.createError = err.error;
        } else if (err.error?.errors) {
          const messages = Object.values(err.error.errors).flat() as string[];
          this.createError = messages.join(' ');
        } else if (err.error?.title) {
          this.createError = err.error.title;
        } else {
          this.createError = 'Failed to create user.';
        }
        this.cdr.detectChanges();
      });
    }
  });
}


  openUserAssignments(user: UserspostModel): void {
    this.selectedUser = user;
    this.assignedAssets = [];
    this.loadingAssignments = true;
    this.showUserAssignmentModal = true;
    this.userpostService.getAssignedAssets(user.id).subscribe({
      next: (res) => {
        this.assignedAssets = res ?? [];
        this.loadingAssignments = false;
      },
      error: (err) => {
        console.error('Failed to load assets', err);
        this.loadingAssignments = false;
      }
    });
  }

  closeUserAssignmentModal(): void {
    this.showUserAssignmentModal = false;
    this.selectedUser = null;
    this.assignedAssets = [];
  }


  openEditModal(user: UserspostModel): void {
    this.selectedUser = { ...user };
    this.editError = '';
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedUser = null;
  }

  saveUserEdits(): void {
    if (!this.selectedUser) return;
    this.editLoading = true;
    this.editError = '';
    this.userpostService.updateUser(this.selectedUser).subscribe({
      next: () => {
        this.editLoading = false;
        this.closeEditModal();
        this.loadUsers();
      },
      error: (err) => {
        this.editLoading = false;
        this.editError = err.error?.message || 'Failed to update user.';
        setTimeout(() => {
    this.createError = err.error?.message || 'Failed to create user.';
    this.cdr.detectChanges();
  });
      }
    });
  }


  openDeactivateModal(user: UserspostModel): void {
    this.selectedUser = user;
    this.showDeactivateModal = true;
  }

  closeDeactivateModal(): void {
    this.showDeactivateModal = false;
    this.selectedUser = null;
  }

  confirmDeactivateUser(): void {
    if (!this.selectedUser) return;
    this.userpostService.deactivateUser(this.selectedUser.id).subscribe({
      next: () => {
        this.closeDeactivateModal();
        this.loadUsers();
      },
      error: (err) => console.error('Deactivate failed', err)
    });
  }

  goBack(): void {
    this.router.navigateByUrl('/admin/dashboard');
  }
}
