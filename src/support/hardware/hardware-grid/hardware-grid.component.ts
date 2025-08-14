
import { HardwareModel } from '../models/hardware-model';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import {Router} from '@angular/router';
import {Table, TableModule} from 'primeng/table' ;
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from 'primeng/api';
import { HardwareService } from '../services/hardware.services';


@Component({
  selector: 'app-hardware-grid',
  imports: [CommonModule,FormsModule,TableModule],
  templateUrl: './hardware-grid.component.html',
  styleUrl: './hardware-grid.component.css'
})
export class HardwareGridComponent {

 data: any;
 hardware$: Observable<HardwareModel[]>= of([]);

  
  constructor(private hardwareService: HardwareService, private router:Router){ }

   ngOnInit(): void 
   {
    // this. assets$=this.inventoryService.getAllAssets();
    this.hardware$=this.hardwareService.getAllHardware().pipe(map(data =>data??[]));

   }

   

goToDashboard()
{
  this.router.navigateByUrl('/dashboard');

}
  

 }







