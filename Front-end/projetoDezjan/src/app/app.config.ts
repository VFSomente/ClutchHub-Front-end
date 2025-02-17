import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


export const appConfig = [
  provideRouter(routes),
  provideHttpClient(
    withInterceptorsFromDi()
  )
];
