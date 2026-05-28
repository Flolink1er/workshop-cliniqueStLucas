import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router: Router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        router.navigateByUrl('/error');
        return EMPTY;
      }

      if (error.status === 401) {
        delete localStorage['token'];
        router.navigateByUrl('/login');
        return EMPTY;
      }

      throw error;
    }),
  );
};
