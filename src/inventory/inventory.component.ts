import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { InventoryService } from './services/inventory.service';
import {Assets } from './models/inventory-model';
import {Router} from '@angular/router';
import {TableModule} from 'primeng/table' ;
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from 'primeng/api';





@Component({
  
  selector: 'app-inventory',
  standalone:true,
  imports: [CommonModule,FormsModule,TableModule, RouterModule,SharedModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
 export class InventoryComponent implements OnInit{

    // assets$? : Observable<Assets[]> | null=null;

 data: any;
 assets$: Observable<Assets[]>= of([]);

  
  constructor(private inventoryService: InventoryService, private router:Router){ }

   ngOnInit(): void 
   {
    // this. assets$=this.inventoryService.getAllAssets();
    this.assets$=this.inventoryService.getAllAssets().pipe(map(data =>data??[]));

   }

   goToAddAssets()
   {
    this.router.navigateByUrl('/assets/add');
   }

goToDashboard()
{
  this.router.navigateByUrl('/dashboard');

}
  

 }





