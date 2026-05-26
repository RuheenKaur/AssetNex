import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupportTicketService } from './supporttickets.service';
import { UserService } from '../../ADMIN/user-master/user.service';

@Component({
  selector: 'app-supporttickets',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './supporttickets.component.html',
  styleUrls: ['./supporttickets.component.css']
})
export class SupportTicketsComponent implements OnInit {

  supportForm!: FormGroup;
  currentUser: any = {};
  assignedAssets: any[] = [];
  isFromAssetPage = false;
  userId: number | null = null;
  showSuccess = false;
  showError = false;
  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  prefillAssetId: number | null = null;
  prefillAssetTag: string = '';
  prefillAssetConcerned: string = '';
  prefillCategory: string = '';

  constructor(
    private fb: FormBuilder,
    private supportService: SupportTicketService,
    private router: Router,
    private userService: UserService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state;

    if (state && state['assetId']) {
      this.prefillAssetId = state['assetId'];
      this.prefillAssetTag = state['assetTag'] || '';
      this.prefillAssetConcerned = state['assetConcerned'] || '';
      this.prefillCategory = state['assetCategory'] || '';
      this.isFromAssetPage = true;
      console.log('Prefill data received from navigation:', state);
    } else {
      const histState = history.state;
      if (histState && histState.assetId) {
        this.prefillAssetId = histState.assetId;
        this.prefillAssetTag = histState.assetTag || '';
        this.prefillAssetConcerned = histState.assetConcerned || '';
        this.prefillCategory = histState.assetCategory || '';
        this.isFromAssetPage = true;
        console.log('Prefill data from history.state:', histState);
      } else {
        console.log('No prefill data — user came from menu');
      }
    }
  }

  ngOnInit(): void {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.currentUser = storedUser;
    this.userId = storedUser.numericId ? Number(storedUser.numericId) : null;

    console.log('Stored user:', storedUser);
    console.log('NumericId for API:', this.userId);

    if (!this.userId) {
      console.error('Numeric userId not found — redirecting to login');
      this.router.navigate(['/login/auth']);
      return;
    }

    this.initForm(storedUser);
    this.loadAssignedAssets(this.userId);
  }

  private initForm(user: any): void {
    this.supportForm = this.fb.group({
      name: [{ value: user.name || user.email || '', disabled: true }],
      email: [{ value: user.email || '', disabled: true }],
      contact: [{ value: user.contact || '', disabled: true }],
      issueCategory: [
        { value: this.prefillCategory || '', disabled: this.isFromAssetPage },
        Validators.required
      ],
      assetId: [
        { value: this.prefillAssetId || '', disabled: this.isFromAssetPage },
        Validators.required
      ],
      issueDescription: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
          this.meaningfulTextValidator()
        ]
      ],
      priority: ['Medium', Validators.required]
    });

    console.log('Form initialised with prefill:', {
      assetId: this.prefillAssetId,
      category: this.prefillCategory,
      isFromAssetPage: this.isFromAssetPage
    });
  }

  private loadAssignedAssets(userId: number): void {
    console.log('Loading assigned assets for userId:', userId);
    this.userService.getAssignedAssetsByUser(userId).subscribe({
      next: (assets) => {
        this.assignedAssets = assets;
        console.log('Assigned assets loaded:', assets.length, 'assets');
        if (assets.length === 0) {
          this.showErrorMessage('No assets assigned. Please contact admin.');
        }
      },
      error: (err) => {
        console.error('Error loading assets:', err);
        this.showErrorMessage('Failed to load assets. Please try again.');
      }
    });
  }

  submitForm(): void {
    Object.keys(this.supportForm.controls).forEach(key => {
      this.supportForm.get(key)?.markAsTouched();
    });

    if (this.supportForm.invalid) {
      console.log('Form is invalid — not submitting');
      return;
    }

    this.isSubmitting = true;
    const formValue = this.supportForm.getRawValue();

    const payload = {
      userId: this.userId,
      assetId: Number(formValue.assetId),
      issueCategory: formValue.issueCategory,
      issueDescription: formValue.issueDescription,
      priority: formValue.priority
    };

    console.log('Submitting ticket payload:', payload);

    this.supportService.createTicket(payload).subscribe({
      next: (res) => {
        console.log('Ticket created successfully:', res);
        this.isSubmitting = false;
        this.showSuccessMessage('Ticket submitted successfully!');
        this.initForm(this.currentUser);
        this.loadAssignedAssets(this.userId!);
        setTimeout(() => {
          this.router.navigate(['/user/trackticket']);
        }, 2000);
      },
      error: (err) => {
        console.error('Error creating ticket:', err);
        this.isSubmitting = false;
        if (err.status === 400) {
          this.showErrorMessage('Invalid ticket data. Please check all fields.');
        } else if (err.status === 401) {
          this.showErrorMessage('Session expired. Please login again.');
          setTimeout(() => this.router.navigate(['/login/auth']), 2000);
        } else {
          this.showErrorMessage('Failed to create ticket. Please try again.');
        }
      }
    });
  }

  private meaningfulTextValidator() {
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

    loadTickets()
  {
  }

  goBack()
{
  this.router.navigateByUrl('/user/dashboard');
}

  private showSuccessMessage(message: string): void {
    this.successMessage = message;
    this.showSuccess = true;
    this.showError = false;
    setTimeout(() => { this.showSuccess = false; }, 3000);
  }

  private showErrorMessage(message: string): void {
    this.errorMessage = message;
    this.showError = true;
    this.showSuccess = false;
    setTimeout(() => { this.showError = false; }, 5000);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.supportForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  goToLanding(): void {
    this.router.navigateByUrl('/landing');
  }
}
