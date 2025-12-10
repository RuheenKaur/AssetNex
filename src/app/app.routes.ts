
// export const appRoutes: Routes = [

//   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

//   { path: 'login', component: LoginComponent },
//   { path: 'login/auth', component: LoginauthComponent },

//   {
//     path: 'dashboard',
//     component: DashboardComponent,
//     canActivate: [AuthGuard],
//     children: [
//       { path: '', redirectTo: 'assets', pathMatch: 'full' },
//       { path: 'assets', component: InventoryComponent },
//       { path: 'assets/add', component: AddAssetComponent },
//       { path: 'assets/delete', component: DeleteAssetComponent },
//       { path: 'ewaste/disposable-assets', component: EDisposeComponent },
//       { path: 'ewaste/disposable-assets/add', component: AddEdisposeComponent },
//       { path: 'ewaste/disposable-assets/update', component: UpdateEdisposeComponent },
//       { path: 'ewaste/disposable-assets/guidelines', component: GuidelinesComponent },
//       { path: 'newsupport', component: SupportTableComponent },
//       { path: 'reports', component: ReportsComponent },
//       { path: 'about', component: AboutComponent },
//       { path: 'livetracking', component: LiveTrackingComponent },
//       { path: 'livemap', component: LiveMapComponent },
//       { path: 'softwarelicense', component: SoftwareLicenseComponent },
//       { path: 'softwarelicense/add', component: AddSoftwareLicenseComponent }
//     ]
//   },


// ];

import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { DashboarduserComponent } from '../../dashboard/dashboarduser/dashboarduser.component';
import { LoginauthComponent } from '../../loginauth/loginauth.component';

import { AssetRequestsComponent } from '../../../USER/asset-requests/asset-requests.component';

import { SupportTicketComponent } from '../../../USER/supporttickets/supporttickets.component';
import { LandingComponent } from '../../landing/landing.component';
import { AssetassignComponent } from '../../../USER/assetassign/assetassign.component';
import { AssetsMasterComponent } from '../../../USER/assets-master/assets-master.component';

export const appRoutes: Routes = [



  {
    path: 'dashboard',
    component: DashboardComponent,
  },


  { path: 'login/auth', component: LoginauthComponent },

  {
    path:'landing',
    component:LandingComponent
  },

  {
    path:'assetrequests',
    component:AssetRequestsComponent
  },


  {
    path:'assetassign',
    component:AssetassignComponent
  },

{
  path:'assetsrequests',
  component:AssetRequestsComponent
},

  {path : 'login/auth',
 component:LoginauthComponent
  },



  {
    path:'assetsmaster',
    component: AssetsMasterComponent
  },

  {
path:'supportrequests',
component:SupportTicketComponent
  },

 {path : 'dashboarduser',
   component:DashboarduserComponent
  },

  {
    path:'assetsassign',
    component:AssetassignComponent
  },



  { path: '**', redirectTo: 'dashboard' }
];


// import { Routes } from '@angular/router';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { LoginComponent } from './login/login.component';
// import { InventoryComponent } from '../inventory/inventory.component';
// import { AuthGuard } from './auth/auth.guard';

// export const appRoutes: Routes = [
//   { path: 'login', component: LoginComponent },

//   // Protected dashboard
//   {
//     path: 'dashboard',
//     component: DashboardComponent,
//     canActivate: [AuthGuard],
//     children: [
//       { path: 'assets', component: InventoryComponent },
//       // add more child routes here
//     ]
//   },

//   // Default redirect
//   { path: '', redirectTo: 'login', pathMatch: 'full' },

//   // Wildcard redirect
//   { path: '**', redirectTo: 'login' }
// ];

// // Auto-redirect to dashboard when already logged in
// // Auto-logout when token expires
// // Page refresh login persistence
