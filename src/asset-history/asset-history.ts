import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AssetsHistoryModel } from './asset-history.model';
import { Observable, of} from 'rxjs';
import { Table, TableModule } from 'primeng/table';
import { DashboardService } from '../maindashboard/dashboard.service';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';
import { AssetHistoryService } from './asset-history.service';

@Component({
  selector: 'app-asset-history',
  imports: [CommonModule,TableModule,ChartModule,],
  templateUrl: './asset-history.html',
  styleUrl: './asset-history.css',
})

export class AssetHistory {

history:AssetsHistoryModel[]=[];
history$?: Observable<AssetsHistoryModel[]>= of([]);

goTo:any;


goBack()
{
  this.router.navigateByUrl('/admin/dashboard');
}

goToDashboardUser()
{
  this.router.navigateByUrl('/dashboarduser');
}


model: Partial<AssetsHistoryModel> = {};

  constructor(private router:Router, private assetHistoryService:AssetHistoryService){
  }

  ngOnInit(): void
{

this.history$ = this.assetHistoryService.getAllAssetsHistory();
    this.assetHistoryService.getAllAssetsHistory().subscribe({
      next: (data) => {
        this.history = data;
        console.log('ADMIN ASSET REQUESTS:', data);
      },
      error: (err) => {
        console.error('Failed to load asset requests', err);
      }
    });

}
}
