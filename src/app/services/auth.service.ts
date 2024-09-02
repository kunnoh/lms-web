import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, retry, catchError, BehaviorSubject } from 'rxjs';
import handleError from '../helpers/error.handler';
import { prod } from '../../env/env';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  // private router: Router = inject(Router);
  private http: HttpClient = inject(HttpClient);
  public isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor() { }
  
  public loginApi(logindata: any): Observable<any> {
    return this.http.post(prod.api + "/auth/login", this.httpOptions, logindata)
      .pipe(retry(1), catchError(handleError));
  };

  public registerApi(userdata: any): Observable<any> {
    return this.http.post(prod.production + "/auth/register", this.httpOptions, userdata)
      .pipe(retry(1), catchError(handleError));
  };
}
