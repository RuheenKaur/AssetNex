import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { LoginAuthComponent } from '../loginauth/loginauth.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-sidebaruser',
  imports: [RouterModule],
  templateUrl: './sidebaruser.html',
  styleUrl: './sidebaruser.css',
})

export class Sidebaruser {
  userId:any;
  userName:any;
  goTo: any;
constructor(private router: Router, private authService:AuthService){}
ngOnInit(): void {
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  this.userId = storedUser.id;
  this.userName=storedUser.name;
  console.log('Stored user:', storedUser);
  console.log('UserId used for asset API:', this.userId);
  console.log('User name:', this.userName);

  if (!this.userId) {
    console.error('UserId not found');
    return;
  }
}
goToLanding()
{
  this.router.navigateByUrl('/landing');
}

  onLogOut()
  {
    this.authService.logout();
    alert('Go ahead with the logout?');
  }

goToAssetAssign()
{
  this.router.navigateByUrl('user/assetassign');
}

goToTracktickets()
{
  this.router.navigateByUrl('user/trackticket');
}

  goToSupporttickets()
  {
    this.router.navigateByUrl('user/supporttickets');
  }

  goToAssetRequest() {
    this.router.navigateByUrl('user/assetsrequests');
  }

getAllAssignedList()
{
  this.router.navigateByUrl('user/assetassign');
}

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}


