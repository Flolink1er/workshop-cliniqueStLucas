import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, UrlTree } from '@angular/router';
import { ErrorService } from 'models/services/error.service';

export const errorGuard: CanActivateFn = (route: ActivatedRouteSnapshot): true | UrlTree => {
  const errorService: ErrorService = inject(ErrorService);
  const router: Router = inject(Router);

  const lastError: number | null = errorService.lastError.code();

  if (lastError === 404) return true;

  const urlCode: number | null = Number(route.paramMap.get('code'));
  if (urlCode === 404) return true;

  if (lastError === null) {
    return router.createUrlTree(['/']);
  }

  return true;
};
