
import { provideHttpClient, withFetch} from '@angular/common/http';
import { appRoutes } from './app.routes';
import { ApplicationConfig} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideRouter} from '@angular/router';




 export const appConfig: ApplicationConfig = {
   providers: [ provideRouter(appRoutes),  provideHttpClient(withFetch()), provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura}
                

            })

              ]

           
 };