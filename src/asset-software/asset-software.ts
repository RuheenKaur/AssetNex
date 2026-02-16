import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AssetSoftwareModel } from './asset-software-model';
import { Observable, of} from 'rxjs';
import { Table, TableModule } from 'primeng/table';
import { DashboardService } from '../maindashboard/dashboard.service';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';
import { AssetSoftwareService } from './asset-software.service';

@Component({
  selector: 'app-asset-software',
  imports: [TableModule,CommonModule],
  templateUrl: './asset-software.html',
  styleUrl: './asset-software.css',
})
export class AssetSoftware {

software:AssetSoftwareModel[]=[];
software$: Observable<AssetSoftwareModel[]>= of([]);
err:any;
data:AssetSoftware[]=[];
goTo:any;


goBack()
{
  this.router.navigateByUrl('/admin/dashboard');
}

goToDashboardUser()
{
  this.router.navigateByUrl('/dashboarduser');
}

  constructor(private router:Router, private softwareService: AssetSoftwareService){
  }

  ngOnInit(): void
{
this.software$ = this.softwareService.getAllAssetSoftware();

    this.softwareService.getAllAssetSoftware().subscribe({
      next: (data) => {
        this.software = data;
        console.log('ADMIN ASSET REQUESTS:', data);
      },
      error: (err) => {
        console.error('Failed to load asset requests', err);

      }
    });
}

}

