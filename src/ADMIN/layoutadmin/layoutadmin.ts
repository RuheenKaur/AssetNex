import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { App } from '../../app/app';
import { Sidebaradmin } from '../sidebaradmin/sidebaradmin';
import { AdminNavbarComponent } from '../navbar-admin/navbar-admin';
import { AdminAssetrequests } from "../assetrequests_admin/admin-assetrequests";


@Component({
  selector: 'app-layoutadmin',
  imports: [Sidebaradmin, AdminNavbarComponent, RouterOutlet],
  templateUrl: './layoutadmin.html',
  styleUrl: './layoutadmin.css',
})
export class Layoutadmin {
goTo:any;

constructor(private router:Router){}

goToLanding()
{
  this.router.navigateByUrl('/landing');
}

}
