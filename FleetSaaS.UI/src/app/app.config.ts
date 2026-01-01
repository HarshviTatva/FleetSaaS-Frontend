import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorHandlerInterceptor } from './core/interceptor/error-handler.interceptor';
import { authTokenInterceptor } from './core/interceptor/authToken.interceptor';
import { provideNativeDateAdapter } from '@angular/material/core';
import { loaderInterceptor } from './core/interceptor/loader.interceptor';
import { DatePipe } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    DatePipe,
    provideNativeDateAdapter(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authTokenInterceptor,loaderInterceptor,errorHandlerInterceptor]))
  ]
};
