import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { LoginAuthComponent } from '../loginauth/loginauth.component';
import { LandingComponent } from '../landing/landing.component';
import { AssetSoftware } from '../asset-software/asset-software';
import { Layoutadmin } from '../layoutadmin/layoutadmin';
import { Layoutuser } from '../layoutuser/layoutuser';
import { DashboardComponent } from '../maindashboard/dashboard.component';
import { DashboarduserComponent } from '../dashboarduser/dashboarduser.component';
import { UsersPost } from '../userspost/userspost/userspost';
import { AssetsMasterComponent } from '../assets-master/assets-master.component';
import { Assetassignpost } from '../assetassignpost/assetassignpost/assetassignpost';
import { SupportTicketsPost } from '../supportticketspost/supportticketspost';
import { AssetassignComponent } from '../assetassign/assetassign.component';
import { SupportTicketsComponent } from '../supporttickets/supporttickets.component';
import { AssetRequestsComponent } from '../asset-requests/asset-requests.component';
import { Trackticket } from '../supporttickets/trackticket/trackticket';
import { AdminAssetrequests } from '../asset-requests/admin-assetrequests/admin-assetrequests';
import { AssetHistory } from '../asset-history/asset-history';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'login/auth', component: LoginAuthComponent },

  // Admin Area
  {
    path: 'admin',
    component: Layoutadmin,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersPost },
      { path: 'assetsmaster', component: AssetsMasterComponent },
      { path: 'assetassignpost', component: Assetassignpost },
      { path: 'supportticketspost', component: SupportTicketsPost },
      { path: 'asset-requests', component: AdminAssetrequests },
      { path: 'assethistory', component: AssetHistory },
      { path: 'assetsoftware', component: AssetSoftware },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // User Area
  {
    path: 'user',
    component: Layoutuser,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboarduserComponent },
      { path: 'assetassign', component: AssetassignComponent },
      { path: 'supporttickets', component: SupportTicketsComponent },
      { path: 'assetsrequests', component: AssetRequestsComponent },
      { path: 'trackticket', component: Trackticket },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {path: 'support/create',component: SupportTicketsComponent
}]

  },


  { path: '**', redirectTo: '/landing' }
];
