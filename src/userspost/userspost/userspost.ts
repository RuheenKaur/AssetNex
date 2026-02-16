import { ChangeDetectorRef, Component } from '@angular/core';
import {Observable, of, map} from 'rxjs';
import { SelectModule } from 'primeng/select';
import {CommonModule} from '@angular/common';
import { UserPostService } from '../userspost.service';
import {Router} from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Assetassign } from '../../assetassign/assetassignmodel';
import { TableModule } from 'primeng/table';
import { UserService } from '../../user.service';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { UserspostModel } from './userspost.model';

@Component({
  selector: 'app-userspost',
  standalone:true,
  imports: [TableModule,CommonModule,ButtonModule,InputTextModule,FormsModule,TooltipModule,SelectModule],
  templateUrl: './userspost.html',
  styleUrl: './userspost.css',
})

export class UsersPost {
constructor(private userpostService:UserPostService, private router:Router, private cdRef : ChangeDetectorRef,
private userService:UserService){}

loading=true;
goTo:any;
users$: Observable<UserspostModel[]>= of([]);
err:any;
users:UserspostModel[]=[];
selectedUserId: number | null = null;
selectedAsset: Assetassign | null = null;
showAssignModal=false;
showUserAssignmentModal = false;
selectedUser: any = null;
assignedAssets: Assetassign[] = [];
loadingAssignments= false;
showEditModal=false;
userAssignments:Assetassign[]=[];
Assets:Assetassign[]=[];
showDeactivateModal = false;

  goToLanding()
  {
    this.router.navigateByUrl('/landing');
  }

goToDashboard()
{
  this.router.navigateByUrl('/dashboard');
}

openAssignModal(user: UserspostModel) {
  this.selectedUser = user;
  this.showAssignModal = true;
}

viewUserAssets(user: any) {
  alert(`Viewing assets for user: ${user.name}`);
  console.log('User assets:', user);
}

  selectAsset(asset: Assetassign)
{
 this.selectedAsset = asset;
}

editUser(user: any) {
  alert(`Editing user: ${user.name}`);
  console.log('Edit user:', user);
}

deleteUser(user: any) {
  if (!confirm('Deactivate this user?')) return;
  this.userpostService.deactivate(user.id)
    .subscribe({
      next: () => alert('User deactivated successfully'),
      error: (err: any) => console.error(err)
    });
}

openUserAssignments(user: UserspostModel): void {
  this.selectedUser = user;
  this.showUserAssignmentModal = true;
  this.assignedAssets = [];
  this.selectedAsset = null;
  this.loadingAssignments = true;

  setTimeout(() => {
    this.userpostService.getAssignedAssets(user.id).subscribe({
      next: (res) => {
        this.assignedAssets = res ?? [];
        this.selectedAsset = this.assignedAssets[0] ?? null;
        this.loadingAssignments = false;
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load assets', err);
        this.assignedAssets = [];
        this.loadingAssignments = false;
        this.cdRef.detectChanges();
      }
    });
  });
}

openAssignmentUsers(user:UserspostModel):void
{
this.selectedUser = user;
this.showUserAssignmentModal = true;
this.assignedAssets = [];
this.selectedAsset = null;
this.loadingAssignments = true;
setTimeout(()=>
{
  this.userpostService.getAssignedAssets(user.id).subscribe({
    next : (res)=>{
      this.assignedAssets = res ?? [];
    this.selectedAsset = this.assignedAssets[0] ?? null;
    this.loadingAssignments= false;
    this.cdRef.detectChanges();
    },
    error:(err) => {
     console.error('Failed to load assets', err);
     this.assignedAssets = [];
     this.loadingAssignments = false;
     this.cdRef.detectChanges();
    }
  });
});
}

addUser()
{
    this.router.navigate(['/users/add']);
}

goBack()
{
  this.router.navigateByUrl('admin/dashboard');
}

openUserAssignmentModal(user: UserspostModel): void {
  this.selectedUser = user;
  this.assignedAssets = [];
  this.selectedAsset = null;
  this.loadingAssignments = true;
  this.showUserAssignmentModal = true;
  this.userpostService.getAssignedAssets(user.id).subscribe({
    next: (res) => {
      this.assignedAssets = res ?? [];
      if (this.assignedAssets.length > 0) {
        this.selectedAsset = this.assignedAssets[0];
      }
      this.loadingAssignments = false;
    },
    error: (err) => {
      console.error('Failed to load assigned assets', err);
      this.loadingAssignments = false;
    }
  });
}

  loadUsers(): void {
  this.userpostService.getAllUsers().subscribe({
    next: data => this.users = data ?? [],
    error: err => console.error(err)
  });
}

  onEditUser(user: UserspostModel): void {

  this.selectedUser = { ...user };
  this.showEditModal = true;
}

saveUserEdits(): void {
  if (!this.selectedUser) return;
  this.userpostService.updateUser(this.selectedUser).subscribe({
    next: () => {
      this.showEditModal = false;
      this.selectedUser = null;
      this.loadUsers();
      alert('User updated successfully');
    },
    error: err => {
      console.error(err);
      alert('Failed to update user');
    }
  });
}

ngOnInit(): void {
  this.userpostService.getAllUsers().subscribe({
    next: (data) => this.users = data ?? [],
    error: err => console.error(err)
  });
}

closeUserAssignmentModal() {
  this.showUserAssignmentModal = false;
  this.selectedUser = null;
  this.selectedAsset = null;
  this.assignedAssets = [];
}

reloadUsers()
{
 this.loading= true;
 this.userpostService.getAllUsers().subscribe({
  next:data =>
    {
    this.users = data;
    this.loading = false;
   },

  error:()=> this.loading =false
 });
}

  openEditModal(user: UserspostModel): void {
    this.selectedUser = { ...user };
    this.showEditModal = true;
  }

  DeactivateUser(user:UserspostModel): void{
    this.selectedUser = user;
    this.showDeactivateModal = true;

  }

  onDeactivateUser(user: UserspostModel): void {
  this.selectedUser = user;
  this.showDeactivateModal = true;
}

confirmDeactivateUser(): void {
  if (!this.selectedUser) return;

  this.userpostService.deactivateUser(this.selectedUser.id).subscribe({
    next: () => {
      this.showDeactivateModal = false;
      this.selectedUser = null;
      this.loadUsers();
      alert('User deactivated successfully');
    },
    error: err => {
      console.error(err);
      alert('Failed to deactivate user');
    }
  });
}

  closeEditModal(): void {
  this.showEditModal = false;
  this.selectedUser = null;
}

openModalDeactivate(user:UserspostModel):void
{
  this.selectedUser = user;
  this.showDeactivateModal = true;
}

openDeactivateModal(user:UserspostModel): void
{
  this.selectedUser= user;
  this.showDeactivateModal= true;
}

  closeDeactivateModal(): void {
    this.showDeactivateModal = false;
    this.selectedUser=null;
  }

  closeDeactivateMod():void{
    this.showDeactivateModal =  false;
    this.selectedUser = null;
  }

  deactivate(userId: number):void{
    this.userpostService.deactivateUser(userId).subscribe({
      next:()=> {
        this.showDeactivateModal= false;
        this.loadUsers();
        alert('User deactivated');
      },
      error: err=>
      {
        console.error(err);
        alert('Failed to deactivatr User');
      }
    });
  }

  deactivateUser(userId: number): void {
    this.userpostService.deactivateUser(userId).subscribe({
      next: () => {
        this.showDeactivateModal = false;
        this.loadUsers();
        alert('User deactivated');
      },
      error: err => {
        console.error(err);
        alert('Failed to deactivate user');
      }
    });
  }


}
