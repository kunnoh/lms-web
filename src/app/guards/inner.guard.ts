import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const innerGuard: CanActivateFn = (route, state) => {
  const authservice: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if(authservice.isLoggedIn()) {
    router.navigate(["/dashboard"]);
    return false;
  }

  return true;
};
