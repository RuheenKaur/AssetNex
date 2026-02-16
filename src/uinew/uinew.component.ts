
import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import{CommonModule}from '@angular/common';
import {RouterModule} from '@angular/router';
import{Router} from '@angular/router';
import{ChartModule} from 'primeng/chart';

 interface Asset {
  name: string;
  status: string;
  date: string;
  flipped?: boolean;
}

@Component({
   selector: 'app-uinew',
   imports: [CommonModule, FormsModule, RouterModule,ChartModule],
   templateUrl: './uinew.component.html',
   styleUrls: ['./uinew.component.css']
 })

export class UinewComponent implements OnInit {
  assets: Asset[] = [];

  constructor(private router : Router){}

  ngOnInit(): void {

    this.assets = [
      { name: 'Laptop - Dell XPS', status: 'Active', date: '2025-08-01' },
      { name: 'Printer - HP LaserJet', status: 'In Repair', date: '2025-07-20' },
      { name: 'Router - Cisco', status: 'Active', date: '2025-06-15' },
      { name: 'Router - Cisco', status: 'In Repair', date: '2025-06-15' },
      {name :'Headphones- Tiesto', status :'In Transit' , date: '2025-19-08'},
      { name: 'Laptop - Macbook 343', status: 'Active', date: '2025-07-05' },
      { name: 'Headphones-RealTek 322', status: 'In Repair', date: '2025-04-20' },
      {name:'Mouse- M4382', status:'Active' , date:'2024-13-20'},
      { name: 'HardDisk - Figoro', status: 'In Repair', date: '2025-04-15' },
      {name :'Android JF- JF909', status :'In Transit' , date: '2025-11-08'},
      {name:'Samsung Tab- ST3420', status:'In Transit', date:'2025-08-08'},
      {name:'Drone 34-Apache 2322', status:'Active', date:'2023-03-12'},
      {name:'Drone 35-Apache 39984', status:'Active', date:'2022-12-12'},
      {name:'Laptop 33-SoK982', status:'In Transit', date:'2025-12-09'},
      {name:'Laptop 31 SOK0202', status:'In Repair', date:'2024-10-10'},
      {name:'Samsung Tab-ST62737', status:'In Repair', date:'2025-09-08'},
      {name:'Headphones Sony-5963', status:'In Transit', date:'2024-06-04'},

    ];
  }

  toggleFlip(asset: Asset) {
    asset.flipped = !asset.flipped;
  }

  updateAsset(asset: Asset) {
    alert(`Update feature for ${asset.name} will go here.`);
  }

  deleteAsset(asset: Asset) {
    alert(`Delete feature for ${asset.name} will go here.`);
  }

  goToAddAsset()
  {
    this.router.navigateByUrl('/assets/add');
  }

    goTo(route: string): void
  {
    this.router.navigateByUrl(route);
  }
}

