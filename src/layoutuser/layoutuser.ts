import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { Sidebaruser } from '../sidebaruser/sidebaruser';
import { Navbar } from '../navbar/navbar';
@Component({
  selector: 'app-layoutuser',
  imports: [Sidebaruser, Navbar, RouterOutlet],
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
