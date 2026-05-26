import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { Sidebaruser } from '../sidebaruser/sidebaruser';
import { AdminNavbarComponent } from '../../ADMIN/navbar-admin/navbar-admin';
import { UserNavbarComponent } from '../navbar-user/navbar-user';

@Component({
  selector: 'app-layoutuser',
  imports: [Sidebaruser, UserNavbarComponent, RouterOutlet],
  templateUrl: './layoutuser.html',
  styleUrl: './layoutuser.css',
})
export class Layoutuser {

  goTo:any;
  constructor(private router: Router){}

  goToLanding()
  {
    this.router.navigateByUrl('/router');
  }
}
