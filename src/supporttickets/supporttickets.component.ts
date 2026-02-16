import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupportTicketService } from './supporttickets.service';
import { UserService } from '../user.service';
import { Users } from '../user.model';

@Component({
  selector: 'app-supporttickets',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './supporttickets.component.html',
  styleUrls: ['./supporttickets.component.css']
})

export class SupportTicketsComponent implements OnInit {
  supportForm!: FormGroup;
  currentUser!: Users;
  assignedAssets: any[] = [];
  prefillData: any = null;
  isFromAssetPage = false;
  userId: any;
  showSuccess = false;
  showError = false;
  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private supportService: SupportTicketService,
    private router: Router,
    private userService: UserService
  ) {

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.prefillData = navigation.extras.state;
      this.isFromAssetPage = true;
      console.log(' Prefill data received:', this.prefillData);
    } else {
      console.log('ℹ No prefill data - user came from menu');
    }
  }

private loadUserAndAssets(userId: number): void {
  console.log('Calling getUserById with ID:', userId);
  this.userService.getUserById(userId).subscribe({
    next: (user: Users) => {
      console.log(' User loaded:', user);
      this.currentUser = user;
      this.supportForm.patchValue({
        name: user.name,
        email: user.email,
        contact: user.contact
      });
      this.loadAssignedAssets(userId);
    },
    error: (err) => {
      console.error(' Error loading user:', err);
      console.error(' Failed userId was:', userId);
      this.showErrorMessage('Failed to load user data');
    }
  });
}

private loadAssignedAssets(userId: number): void {
  console.log('Calling getAssignedAssetsByUser with ID:', userId);

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
      this.showErrorMessage('Failed to load assets');
    }
  });
}

ngOnInit(): void {
  const userIdStr = localStorage.getItem('userId');
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = userIdStr ? Number(userIdStr) : null;
  console.log(' Stored user:', storedUser);
  console.log(' UserId used for API:', userId);
  console.log(' User name:', storedUser.name);
  if (!userId) {
    console.error('Numeric userId not found');
    this.router.navigate(['/login']);
    return;
  }
  this.currentUser = storedUser;
  this.initForm();
  this.loadUserAndAssets(userId);
}

  private initForm(): void {
    this.supportForm = this.fb.group({
      name: [{ value: this.currentUser?.name || '', disabled: true }],
      email: [{ value: this.currentUser?.email || '', disabled: true }],
      contact: [{ value: this.currentUser?.contact || '', disabled: true }],
      issueCategory: [
        this.prefillData?.assetCategory || '',
        Validators.required
      ],
      assetId: [
        this.prefillData?.assetId || '',
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

    if (this.isFromAssetPage) {
      this.supportForm.get('assetId')?.disable();
      this.supportForm.get('issueCategory')?.disable();
      console.log(' Fields disabled for prefill mode');
    }
  }

private loadUserData(userId: number): void{
  this.userService.getUserById(userId).subscribe({
    next: (user:Users) =>
    {
      this.currentUser = user;
      this.supportForm.patchValue({
        name:user.name,
        email:user.email,
        contact:user.contact
      });
      this.loadAssignedAssets(userId);
    },
    error: (err) =>
    {
      console.error('Error loading user:', err);
    }
  })
}

submiForm():void{
  Object.keys(this.supportForm.controls).forEach(key =>{
    this.supportForm.get(key)?.markAsTouched();
  });
  if(this.supportForm.invalid){
    console.log('Form is invalid');
    return;
  }

  this.isSubmitting = true;
  const formValue = this.supportForm.getRawValue();
  const payload = {
    assetId: formValue.assetId,
    issueCategory: formValue.issueCategory,
    issueDescription:formValue.issueDescription,
    priority:formValue.priority
  };
  console.log('Submitting ticket:', payload);
}


  submitForm(): void {
    Object.keys(this.supportForm.controls).forEach(key => {
      this.supportForm.get(key)?.markAsTouched();
    });
    if (this.supportForm.invalid) {
      console.log('Form is invalid');
      return;
    }
    this.isSubmitting = true;
    const formValue = this.supportForm.getRawValue();
    const payload = {
      assetId: Number(formValue.assetId),
      issueCategory: formValue.issueCategory,
      issueDescription: formValue.issueDescription,
      priority: formValue.priority
    };
    console.log('Submitting ticket:', payload);
    this.supportService.createTicket(payload).subscribe({
      next: (response) => {
        console.log('Ticket created:', response);
        this.isSubmitting = false;
        this.showSuccessMessage('Support ticket created successfully!');
        setTimeout(() => {
          this.router.navigate(['/user/supporttickets']);
        }, 2000);
      },
      error: (err) => {
        console.error('Error creating ticket:', err);
        this.isSubmitting = false;
        if (err.status === 400) {
          this.showErrorMessage('Invalid ticket data. Please check all fields.');
        } else if (err.status === 401) {
          this.showErrorMessage('Session expired. Please login again.');
          setTimeout(() => this.router.navigate(['/login']), 2000);
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


  private showSuccessMessage(message: string): void {
    this.successMessage = message;
    this.showSuccess = true;
    this.showError = false;

    setTimeout(() => {
      this.showSuccess = false;
    }, 3000);
  }


  private showErrorMessage(message: string): void {
    this.errorMessage = message;
    this.showError = true;
    this.showSuccess = false;

    setTimeout(() => {
      this.showError = false;
    }, 5000);
  }
  isFieldInvalid(fieldName: string): boolean {
    const field = this.supportForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  goToLanding(): void {
    this.router.navigateByUrl('/landing');
  }

}
