import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from 'models/services/error.service';
import { catchError, EMPTY } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router: Router = inject(Router);
  const errorService: ErrorService = inject(ErrorService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      errorService.lastError = [error.status, error.statusText];
      router.navigateByUrl('/error');

      if (error.status === 0) {
        return EMPTY;
      }

      if (error.status === 401) {
        router.navigateByUrl('/login');
        delete localStorage['token'];
        return EMPTY;
      }

      throw error;
    }),
  );
};
