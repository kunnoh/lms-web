import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
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

  private http: HttpClient = inject(HttpClient);
  public isLoggedIn = signal<boolean>(false);

  constructor() {
    if(this.getToken()){
      this.isLoggedIn.update(() => true);
    }
  }
  
  public loginApi(logindata: any): Observable<any> {
    return this.http.post(prod.api + "/auth/login", logindata, this.httpOptions)
      .pipe(retry(1), catchError(handleError));
  };

  public registerApi(userdata: any): Observable<any> {
    return this.http.post(prod.production + "/auth/register", userdata, this.httpOptions)
      .pipe(retry(1), catchError(handleError));
  };

  public getToken(): string | null {
    return localStorage.getItem("token") || null;
  }
}
