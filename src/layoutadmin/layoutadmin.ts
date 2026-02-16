import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { App } from '../app/app';
import { Sidebaradmin } from '../sidebaradmin/sidebaradmin';
import { Navbar } from '../navbar/navbar';


@Component({
  selector: 'app-layoutadmin',
  imports: [Sidebaradmin,Navbar,RouterOutlet],
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
