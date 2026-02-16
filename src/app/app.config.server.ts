
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { provideServerRendering } from '@angular/platform-server';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Import the provider
import { appRoutes } from './app.routes';
import { provideCloudflareLoader } from '@angular/common';
import { provideClientHydration } from '@angular/platform-browser';

const serverConfig: ApplicationConfig = {
  providers: [
provideClientHydration(),
 provideRouter(appRoutes),
    provideHttpClient() //
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);







