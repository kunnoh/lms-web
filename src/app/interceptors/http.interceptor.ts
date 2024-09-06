import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  if(authService.isLoggedIn()){
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    });
  }
  return next(req).pipe(
    retry(2),
    catchError((e: HttpErrorResponse) => {
      if(e.status === 401){
        localStorage.removeItem("token");
        router.navigate(["auth"]);
      }
      const err = e.error.message || e.statusText;
      return throwError(() => err);
    })
  );
};
