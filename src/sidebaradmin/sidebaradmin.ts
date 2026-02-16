import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebaradmin',
  imports: [],
  templateUrl: './sidebaradmin.html',
  styleUrl: './sidebaradmin.css',
})
export class Sidebaradmin {

  goTo:any;
  constructor(private router:Router){}
getAllAssetMaster()
{
  this.router.navigateByUrl('admin/assetsmaster');
}

getAllAssignedAssets()
{
  this.router.navigateByUrl('admin/assetassignpost')
}


getAllUsers()
{
  this.router.navigateByUrl('admin/users');
}



getAllAssetHistory(){
  this.router.navigateByUrl('admin/assethistory')
}


getAllAssetsRequests(){
  this.router.navigateByUrl('admin/asset-requests');
}

getAllAssetSoftware()
{
  this.router.navigateByUrl('admin/assetsoftware');
}


getAllSupportTickets()
{
  this.router.navigateByUrl('admin/supportticketspost');
}

     isSidebarCollapsed = false;

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }


}

