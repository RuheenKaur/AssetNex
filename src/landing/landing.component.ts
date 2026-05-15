import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-landing',
  imports: [FormsModule,CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent  {
constructor (private router: Router){}

goToLogin() {
  this.router.navigateByUrl('/login/auth');
}

goToAbout(){
  this.router.navigateByUrl('/about');
}
}






