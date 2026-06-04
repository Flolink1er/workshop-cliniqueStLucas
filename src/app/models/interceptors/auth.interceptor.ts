import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiService } from 'models/services/api.service';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const apiService: ApiService = inject(ApiService);
  const tokenValue: string = apiService.token();

  if (req.url.startsWith('http://localhost:5150/api/') && tokenValue) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', tokenValue),
    });
    return next(authReq);
  }

  return next(req);
};
