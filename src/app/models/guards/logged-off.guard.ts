import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { UserAccountService } from 'models/services/user-account.service';

export const loggedOffGuard: CanActivateFn = (): true | UrlTree => {
  const router: Router = inject(Router);
  const userAccount: UserAccountService = inject(UserAccountService);

  return !userAccount.isLoggedIn ? true : router.createUrlTree(['/home']);
};
