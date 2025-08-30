import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

//Sendo personalidado "meuhttpInterceptor" se for usar em outro projeto tem que ajusta!
//E lembrando que tem que adiciona ele na app.config.ts
export const meuhttpInterceptor: HttpInterceptorFn = (request, next) => {

  let router = inject(Router);

  //Inclui o token do localstorage em cada requisição http(header)
  let token = localStorage.getItem('token');
  console.log('entrou aqui 1');
  if (token && !router.url.includes('/login')) {
    request = request.clone({
      setHeaders: { Authorization: 'Bearer ' + token },
    });
  }

  //Trata dos responses... podemos tratar os erros genericamente aqui
  //e podemos adcionar os stilos de msgs do plugin do sweetalert2
  return next(request).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        console.log('entrou aqui 2');

        if (err.status === 401) {
          window.alert('401 - tratar aqui');
          router.navigate(['/login']);
        } else
        if (err.status === 403) {
          window.alert('403 - tratar aqui');
          router.navigate(['/login']);
        } else {
          console.error('HTTP error:', err);
        }


      } else {
        console.error('An error occurred:', err);
      }

      return throwError(() => err);
    })
  );
};
