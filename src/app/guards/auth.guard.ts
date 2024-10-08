import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authservice: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (!authservice.isLoggedIn()) {
    router.navigate(["/auth"]);
    return false;
  }
  return true;
};
