import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, retry, catchError, filter } from 'rxjs';
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
  
  public loginApi(logindata: any): Observable<any> {
    return this.http.post(prod.api + "/auth/login", logindata, this.httpOptions)
      .pipe(
        retryWhen(errors =>
          errors.pipe(
            // Only retry on network errors (status 0)
            filter((error: HttpErrorResponse) => error.status === 0),
            delay(1000), // Retry after 1 second delay
            take(2) // Retry 2 times before failing
          )
        ),
        catchError(handleError)
      );
  }

  public registerApi(userdata: any): Observable<any> {
    return this.http.post(prod.api + "/auth/register", userdata, this.httpOptions)
      .pipe(retry(1), catchError(handleError));
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

