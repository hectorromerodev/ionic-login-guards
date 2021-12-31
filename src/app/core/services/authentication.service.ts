import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@capacitor/storage'
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators'

const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token: string = '';

  constructor(private _http: HttpClient) {
    this.loadToken();
  }

  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      console.log('Set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false)
    }
  }

  login(credentials: LoginCredentials): Observable<any> {
    return this._http.post('https://reqres.in/api/login', credentials)
      .pipe(
        map((data: any) => data.token),
        switchMap((token: string) => {
          // With this, we are returning an observable from a Promise(Storage)
          return from(Storage.set({ key: TOKEN_KEY, value: token }));
        }),
        tap(_ => {
          this.isAuthenticated.next(true);
        })
      )
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({ key: TOKEN_KEY });
  }
}

interface LoginCredentials {
  email: string;
  password: string;
}
