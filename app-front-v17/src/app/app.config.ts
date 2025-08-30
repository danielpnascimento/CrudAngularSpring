import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { meuhttpInterceptor } from './auth/http-interceptor.service';

export const appConfig: ApplicationConfig = {
  //Adcionando o provideHttpClient() para integrar o back "cross"
  //E ir la na controller do back e adcionar lá a @CrossOrigin("*")
  providers: [provideRouter(routes), provideAnimations(),
    provideHttpClient(withInterceptors([meuhttpInterceptor]))]
};
// Ele meuhttpInterceptor que adiciona o token na url da requisição
