import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),provideHttpClient(),
    provideRouter(appRoutes), provideClientHydration(withEventReplay()),
    provideAnimations(),
  ]
};


//issues - dashboard admin too big everything , colors not right, 

// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { appRoutes } from './app.routes';
// import { provideHttpClient } from '@angular/common/http';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(appRoutes),
//     provideHttpClient()
//   ]
// };
