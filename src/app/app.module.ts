
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { App } from './app';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgxCaptchaModule} from 'ngx-captcha';
import {inject} from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {ToastrModule} from 'ngx-toastr';
import { PrimeIcons} from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { PrimeNG } from 'primeng/config';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    NgxCaptchaModule,ReactiveFormsModule,FormsModule,
     ToastrModule.forRoot({

      preventDuplicates: false,
      progressBar: true,
      countDuplicates: true,
      extendedTimeOut: 3000,
      positionClass: 'toast-bottom-right',
    }),
  ],
  declarations: [],
  bootstrap:[],
  providers: [{ provide: 'BASE_API_URL', useValue: 'http://localhost:4200' },
  ],
})
export class AppModule {}


