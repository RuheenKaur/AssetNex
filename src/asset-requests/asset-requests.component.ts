
import { Component, OnInit, ChangeDetectorRef, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AssetRequestService } from './asset-requests.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { Users } from '../user.model';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AssetRequestsPayload } from './assetrequestspayload';

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
  goTo:any;
  asset: any;
  successMessage = '';
  currentUser: any;
  success: any;

  constructor(
    private fb: FormBuilder,
    private assetRequestsService: AssetRequestService,
    private router: Router,
    private userService: UserService,
    private assetRequestService: AssetRequestService
  ) {}

  ngOnInit(): void{
  this.initForm();
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = storedUser.id;
  if (!userId) {
    console.error('User id missing');
    return;
  }

  this.user = storedUser;
  this.userService.getUserById(userId).subscribe({
    next: (user: Users) => {
      this.currentUser = user;
      this.requestForm.patchValue({
        name: user.name,
        email: user.email,
        contact: user.contact
      });
      this.loadAssignedAssets();
        console.log(this.requestForm.getRawValue());
    },
    error: err => console.error(err)
  });
}
  private initForm() {
    this.requestForm = this.fb.group({
      name: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      contact: [{ value: '', disabled: true }],
         assetId: ['', Validators.required],
      requestedAssetType: ['', Validators.required],
      reason: [  '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(300),
        this.meaningfulTextValidator()
      ]]
    });
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
  this.userService.getAssignedAssetsByUser(this.currentUser.id).subscribe({
    next: (assets) => {
      this.assetRequests = assets;
      console.log('ASSET REQUESTS:', assets);
    },
    error: err => console.error('Failed to load assets', err)
  });
}

  submitForm()
  {
    if (this.requestForm.invalid || !this.currentUser) return;
    const formData = this.requestForm.getRawValue();
      const payload: AssetRequestsPayload = {
  assetId: Number(formData.assetId),
  requestedAssetType: formData.requestedAssetType,
  reason: formData.reason
};
  console.log('Submitting request payload:', payload);
    this.assetRequestsService.createRequest(payload).subscribe({
      next: () => {
        alert('Asset Request Submitted Successfully');
        this.requestForm.patchValue({
          assetId:'',
          requestedAssetType: '',
          reason: ''
        });
      },
      error: err => console.error('Asset request failed', err)
    });
  }

  goToLanding()
  {
    this.router.navigateByUrl('/landing');
  }
}


// @Injectable({ providedIn: 'root' })
// export class AssetResolver implements Resolve<Asset[]> {
//   constructor(private assetService: AssetService) {}

//   resolve(): Observable<Asset[]> {
//     return this.assetService.getAssets();
//   }
// }
// In routing:
// typescript{
//   path: 'assets',
//   component: AssetListComponent,
//   resolve: { assets: AssetResolver }
// }
// In component:
// typescriptngOnInit() {
//   this.assets = this.route.snapshot.data['assets'];
// }

//  thread pool manages a fixed set of reusable threads,
//  async releases threads back to it on await, avoiding thread exhaustion under load.
