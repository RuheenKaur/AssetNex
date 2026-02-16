// import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.html',
//   styleUrl: './app.css'
// })
// export class App {
//   protected readonly title = signal('NewAssetNexIT');
// }


import { Component,Injectable } from '@angular/core';
import { Router, NavigationEnd, RouterModule, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgModule } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone:true,
  styleUrl: './app.css',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCaptchaModule,
    HttpClientModule,

]
})

@Injectable ({
  providedIn:'root',
})

export class App{
  title = 'IT_Asset';
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
}
