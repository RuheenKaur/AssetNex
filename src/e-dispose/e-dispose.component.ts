import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { EDisposeService } from './services/e-dispose.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { DisposeDetails } from './models/e-dispose.model';
import { model } from '@angular/core';
import {of} from 'rxjs';
import { map } from 'rxjs/operators';
import {TableModule} from 'primeng/table' ;
import {SharedModule} from 'primeng/api';


@Component
({
  selector: 'app-e-dispose',
  standalone:true,
  imports: [FormsModule,CommonModule, SharedModule,TableModule],
  templateUrl: './e-dispose.component.html',
  styleUrl: './e-dispose.component.css',
})

export class EDisposeComponent implements OnInit{

model:DisposeDetails;
data: any;
disposedetails$: Observable<DisposeDetails[]>= of([]);

constructor(private router:Router, private edisposeService:EDisposeService){
this.model={

  id:'',
    assetTypeId:'',
    assetName:'',
    assetType:'',
    reason:'',
    disposedOn: '',
    disposedBy:'',
    condition:'',
  dateOfIssue:'',
  warrantyDate:'',
 status:'',

}

}


ngOnInit(): void {

    this.disposedetails$ = this.edisposeService.getDisposedAssets();
   
  this.edisposeService.getDisposedAssets().subscribe(data => {
    console.log('DISPOSE DATA:', data);
    this.disposedetails$ = of(data);  // Use 'of' to convert to Observable
  });
}

     


  goToAddEDispose() {
    this.router.navigateByUrl('/ewaste/disposable-assets/add'); 
  }

  goToDashboard()
  {
    this.router.navigateByUrl ('/dashboard');
    
  }

  goToGuidelines(){
     this.router.navigateByUrl ('/ewaste/disposable-assets/guidelines');
    
  }
  }

  



