import { Routes } from '@angular/router';
import { AuthGuard } from '../SHARED/auth/auth.guard';
import { LoginAuthComponent } from '../SHARED/loginauth/loginauth.component';
import { LandingComponent } from '../SHARED/landing/landing.component';
import { AssetSoftware } from '../ADMIN/asset-software/asset-software';
import { Layoutadmin } from '../ADMIN/layoutadmin/layoutadmin';
import { Layoutuser } from '../USER/layoutuser/layoutuser';
import { DashboardComponent } from '../ADMIN/maindashboard/dashboard.component';
import { DashboarduserComponent } from '../USER/dashboarduser/dashboarduser.component';
import { UsersPost } from '../ADMIN/user-master/userspost/userspost';
import { AssetsMasterComponent } from '../ADMIN/assets-master/assets-master.component';
import { Assetassignpost } from '../ADMIN/asset-assign_admin/asset-assign_admin/assetassignpost';
import { SupportTicketsPost } from '../ADMIN/supporttickets_admin/supportticketspost';
import { AssetassignComponent } from '../USER/asset-assign/assetassign.component';
import { SupportTicketsComponent } from '../USER/supporttickets/supporttickets.component';
import { AssetRequestsComponent } from '../USER/asset-requests/asset-requests.component';
import { TrackTicketsComponent } from '../USER/trackticket/trackticket';
import { AdminAssetrequests } from '../ADMIN/assetrequests_admin/admin-assetrequests';
import { AssetHistory } from '../ADMIN/asset-history/asset-history';
import { SupportTicketsResolver } from '../ADMIN/supporttickets_admin/supportticketspost.resolver';
import { ExploreComponent } from '../SHARED/explore/explore.component';
import { AboutComponent } from '../SHARED/about/about.component';
import { LogoutComponent } from '../SHARED/logout/logout';
import { TrackRequestsComponent } from '../USER/trackrequests/trackrequests';


export const appRoutes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'about', component: AboutComponent},
  { path: 'login/auth', component: LoginAuthComponent },
  {path: 'logout', component: LogoutComponent },
  {
    path: 'admin',
    component: Layoutadmin,
    canActivate: [AuthGuard],
    data: {role: 'Admin'},
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersPost },
      { path: 'assetsmaster', component: AssetsMasterComponent },
      { path: 'assetassignpost', component: Assetassignpost },
      { path: 'supportticketspost',component: SupportTicketsPost},
      { path: 'asset-requests', component: AdminAssetrequests },
      { path: 'assethistory', component: AssetHistory },
      { path: 'assetsoftware', component: AssetSoftware },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  {
    path: 'user',
    component: Layoutuser,
    canActivate: [AuthGuard],
    data: {role: 'User'},
    children: [
      { path: 'dashboard', component: DashboarduserComponent },
      { path: 'assetassign', component: AssetassignComponent },
      { path: 'supporttickets', component: SupportTicketsComponent },
      { path: 'track-requests', component: TrackRequestsComponent },
      { path: 'assetsrequests', component: AssetRequestsComponent },
      { path: 'trackticket', component: TrackTicketsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {path: 'support/create',component: SupportTicketsComponent
}]

  },

  { path: '**', redirectTo: '/landing' }
];
