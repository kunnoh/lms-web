import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, retry, catchError } from 'rxjs';
import handleError from '../helpers/error.handler';
import { prod } from '../../env/env';

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

  private state = signal<AuthState>({
    isLogged: false,
    token: null,
    isLoading: false,
    error: null,
  });

  constructor() {
    if(this.getToken()){
      this.isLoggedIn.update(() => true);
    }
  }
  
  public loginApi(logindata: { email: string, password: string }): Observable<any> {
    return this.http.post(prod.api + "/auth/login", logindata, this.httpOptions)
      .pipe(
        retry(1),
        catchError(handleError)
      );
  }

  public registerApi(userdata: any): Observable<any> {
    return this.http.post(prod.api + "/auth/register", userdata, this.httpOptions)
      .pipe(
        retry(1),
        catchError(handleError)
      );
  };

  public getToken(): string | null {
    return localStorage.getItem("token") || null;
  }
}

export interface AuthState {
  isLogged: boolean,
  token: string | null,
  isLoading: boolean,
  error: null
}
function retryWhen(arg0: (errors: any) => any): import("rxjs").OperatorFunction<Object, any> {
  throw new Error('Function not implemented.');
}

function delay(arg0: number): any {
  throw new Error('Function not implemented.');
}

function take(arg0: number): any {
  throw new Error('Function not implemented.');
}

