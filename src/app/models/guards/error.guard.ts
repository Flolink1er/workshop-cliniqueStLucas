import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ErrorService } from 'models/services/error.service';

export const errorGuard: CanActivateFn = (route): boolean => {
  const errorService: ErrorService = inject(ErrorService);
  const router: Router = inject(Router);

  const lastError = errorService.lastError.code();

  if (lastError === 404) return true;

  const urlCode = Number(route.paramMap.get('code'));
  if (urlCode === 404) return true;

  if (lastError === null) {
    router.navigateByUrl('/');
    return false;
  }

  return true;
};
