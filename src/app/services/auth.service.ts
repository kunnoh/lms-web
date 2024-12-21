import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, retry, catchError, firstValueFrom } from 'rxjs';
import handleError from '../helpers/error.handler';
import { env } from '../../env/env';
import { User } from '../models/user.model';

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  #userSignal = signal<User | null>(null);
  user = this.#userSignal.asReadonly();

  private http: HttpClient = inject(HttpClient);
  public isLoggedIn = computed(() => !!this.user());

  private state = signal<AuthState>({
    isLogged: false,
    token: null,
    isLoading: false,
    error: null,
  });

  constructor() {
    // if(this.getToken()){
    //   this.isLoggedIn.update(() => true);
    // }
  }
  
  public async loginApi(logindata: { email: string, password: string }): Promise<User> {
    const login$ = this.http.post<User>(env.API_URL + "/auth/login", logindata, this.httpOptions)
      .pipe(
        retry(1),
        catchError(handleError)
      );

    const user = await firstValueFrom(login$);
    this.#userSignal.set(user);
    return user;
  }

  public registerApi(userdata: any): Observable<any> {
    return this.http.post(env.API_URL + "/auth/register", userdata, this.httpOptions)
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


