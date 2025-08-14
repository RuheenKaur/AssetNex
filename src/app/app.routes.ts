

import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from '../landing/landing.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InventoryComponent } from '../inventory/inventory.component';
import { LoginComponent } from './login/login.component';
import { AddAssetComponent } from '../inventory/add-asset/add-asset.component';
import { SupportComponent } from '../support/support.component';
import { EDisposeComponent } from '../e-dispose/e-dispose.component';
import { SoftwareLicenseComponent } from './software-license/software-license.component';
import { UpdateEdisposeComponent } from '../e-dispose/update-edispose/update-edispose.component';
import { AddSoftwareLicenseComponent } from './software-license/add-software-license/add-software-license.component';
import { AddEdisposeComponent } from '../e-dispose/add-edispose/add-edispose.component';
import { AboutComponent } from '../about/about.component';
import { HardwareComponent } from '../support/hardware/hardware.component';
import { HardwareGridComponent } from '../support/hardware/hardware-grid/hardware-grid.component';
import { SupportTableComponent } from '../support/support-table/support-table.component';
import { GuidelinesComponent } from '../e-dispose/guidelines/guidelines.component';


export const appRoutes: Routes =
 [
    { 
    path: 'landing',
    component: LandingComponent
   },

   {
    path:'about',
    component:AboutComponent
   },

     { 
    path: 'login',
    component: LoginComponent,
   },

       { 
    path: 'landing/navbar',
    component: NavbarComponent
   },


  { 
    path: 'dashboard',
    component: DashboardComponent
   },

  { 
    path: '', 
    redirectTo: 'dashboard', 
    pathMatch: 'full'
   },

   { 
    path: 'assets',
    component: InventoryComponent
   },

   {
    path:'assets/add',
    component: AddAssetComponent
   },

   {
    path:'assets/support',
    component:SupportComponent
   },

   {
    path:'assets/support/hardware',
    component:HardwareComponent
   },

   {
    path:'newsupport',
    component:SupportTableComponent
   },

   {
    path:'assets/hardware',
    component:  HardwareGridComponent 
   },

{
  path:'ewaste/disposable-assets',
  component:EDisposeComponent
},

{
  path:'ewaste/disposable-assets/add',
  component:AddEdisposeComponent
},

{
  path:'ewaste/disposable-assets/update',
  component:UpdateEdisposeComponent
},
{
    path:'ewaste/disposable-assets/guidelines',
  component:GuidelinesComponent
},

{
  path:'softwarelicense',
  component:SoftwareLicenseComponent
},

{
  path:'softwarelicense/add',
  component:AddSoftwareLicenseComponent
},

// {
//   path:'assets/software-license/update',
//   component:UpdateSoftwareLicenseComponent
// }

];


export const appConfig = {
  providers: [provideRouter(appRoutes)]
};


