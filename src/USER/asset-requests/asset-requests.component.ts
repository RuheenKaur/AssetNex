import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AssetRequestService } from './asset-requests.service';
import { UserService } from '../../ADMIN/user-master/user.service';
import { Users } from '../../ADMIN/user-master/user.model';
import { AssetRequestsPayload } from './assetrequestspayload';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-asset-requests',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './asset-requests.component.html',
  styleUrl: './asset-requests.component.css'
})
export class AssetRequestsComponent implements OnInit {

  assetRequests: any[] = [];
  loading = false;
  requestForm!: FormGroup;
  user: any;
  currentUser: any;
  success = false;
  numericUserId: any;

  constructor(
    private fb: FormBuilder,
    private assetRequestsService: AssetRequestService,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}


ngOnInit(): void {
  this.initForm();
  
  const userId = this.authService.getNumericId();
  
  if (!userId) {
    console.error('User id missing');
    return;
  }

  this.userService.getUserById(userId).subscribe({
    next: (user: Users) => {
      this.currentUser = user;
      this.requestForm.patchValue({
        name: (user as any).name || (user as any).Name || '',
        email: (user as any).email || (user as any).Email || '',
        contact: (user as any).contact || (user as any).Contact || ''
      });
      this.loadAssignedAssets();
    },
    error: err => {
      console.error('Failed to load user', err);
    }
  });
}
  private initForm() {
    this.requestForm = this.fb.group({
      name: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      contact: [{ value: '', disabled: true }],
      assetId: ['', Validators.required],
      requestedAssetType: ['', Validators.required],
      reason: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(300),
          this.meaningfulTextValidator()
        ]
      ]
    });
  }

  loadTickets()
  {

  }

  goBack()
{
  this.router.navigateByUrl('/user/dashboard');
}

  meaningfulTextValidator() {

    return (control: AbstractControl): ValidationErrors | null => {

      const value = control.value?.trim();

      if (!value) return null;

      if (/^(.)\1{4,}$/.test(value)) {
        return { gibberish: true };
      }

      if (/^[^a-zA-Z0-9\s]+$/.test(value)) {
        return { gibberish: true };
      }

      const words = value
        .split(/\s+/)
        .filter((w: string) => /^[a-zA-Z]{3,}$/.test(w));

      if (words.length < 2) {
        return { notMeaningful: true };
      }

      return null;
    };
  }


  loadAssignedAssets() {
  const userId = this.authService.getNumericId(); // fix this line
  console.log('Loading assets for user:', userId);
  if (!userId) {
    console.error('Numeric userId missing');
    return;
  }
  this.userService.getAssignedAssetsByUser(userId).subscribe({
    next: (assets) => {
      this.assetRequests = assets;
      if (assets.length > 0) {
        this.requestForm.patchValue({
          assetId: assets[0].assetId || assets[0].id
        });
      }
    },
    error: err => console.error('Failed to load assets', err)
  });
}


submitForm(): void {
  if (this.loading) return;
  if (this.requestForm.invalid) {
    this.requestForm.markAllAsTouched();
    return;
  }
  this.loading = true;
  const formData = this.requestForm.getRawValue();

  const payload: AssetRequestsPayload = {
    assetId: Number(formData.assetId),
    requestedAssetType: formData.requestedAssetType,
    reason: formData.reason.trim()
  };

  this.assetRequestsService.createRequest(payload).subscribe({
    next: (res) => {
      this.success = true;
      this.loading = false;
      this.requestForm.patchValue({ requestedAssetType: '', reason: '' });
    },
    error: (err) => {
      this.loading = false;
      alert('Failed: ' + (err.error?.message || err.message || 'Unknown error'));
    }
  });
}

  goToLanding() {
    this.router.navigateByUrl('/landing');
  }

  goToUserDashboard() {
    this.router.navigateByUrl('/user/dashboard');
  }
}
