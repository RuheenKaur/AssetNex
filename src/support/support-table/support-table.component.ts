import { Component,inject, OnInit } from '@angular/core';

import { Support } from '../models/support.model';

import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import {Router} from '@angular/router';
import {Table, TableModule} from 'primeng/table' ;
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from 'primeng/api';
import { SupportService } from '../services/support.service';

@Component({
  selector: 'app-support-table',
  imports: [CommonModule,RouterModule,SharedModule,TableModule],
  templateUrl: './support-table.component.html',
  styleUrl: './support-table.component.css'
})
export class SupportTableComponent {


data: any;
support$: Observable<Support[]>= of([]);

  
  constructor(private supportService: SupportService, private router:Router){ }

   ngOnInit(): void 
   {
   
    this.support$=this.supportService.getAllSupport().pipe(map(data =>data??[]));

   }

   goToAddSupport()
   {
    this.router.navigateByUrl('/assets/support/add');
   }

   goToDashboard()
   {
    this.router.navigateByUrl('/dashboard');
    
   }

  

 }










