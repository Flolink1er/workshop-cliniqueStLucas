import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpSentEvent,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from 'models/services/error.service';
import { UserAccountService } from 'models/services/user-account.service';
import { catchError, EMPTY, Observable } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpSentEvent | HttpEvent<unknown>> => {
  const router: Router = inject(Router);
  const errorService: ErrorService = inject(ErrorService);
  const userAccount: UserAccountService = inject(UserAccountService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      errorService.lastError = [error.status, error.statusText];
      if (error.status !== 401) router.navigateByUrl('/error');

      if (error.status === 0) {
        errorService.lastError = [error.status, "L'API a mis n'a émis aucune réponse"];
        return EMPTY;
      }

      if (error.status === 401) {
        userAccount.userLogout();
        return EMPTY;
      }

      throw error;
    }),
  );
};
