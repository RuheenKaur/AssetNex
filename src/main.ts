import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { HttpClientModule } from '@angular/common/http';
  import { BootstrapOptions, importProvidersFrom } from '@angular/core';
import { HttpClient } from '@angular/common/http';




bootstrapApplication(App, {
  providers: [
    importProvidersFrom(HttpClientModule),
    ...appConfig.providers
  ]
});

