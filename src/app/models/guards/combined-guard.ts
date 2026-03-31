import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccessService } from 'services/access-service';
import { AuthService } from 'services/auth-service';

export const mainGuard: CanActivateFn = async (): Promise<boolean> => {
  const accessService = inject(AccessService);
  const authService = inject(AuthService);

  const [hasAccess, isAuth] = await Promise.all([
    accessService.responded(),
    authService.isAuthenticated(),
  ]);

  return hasAccess && isAuth;
};
