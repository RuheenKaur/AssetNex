import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { appRoutes } from './app/app.routes';

bootstrapApplication(AppComponent, appConfig,
 )
  .catch((err) => console.error(err));



 