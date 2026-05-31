import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';

interface LoginResponseBody {
  token: string;
  tokenType: string;
  expiresIn: number;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  private readonly _http: HttpClient = inject(HttpClient);
  private readonly _router: Router = inject(Router);
  private _isLoggedIn: WritableSignal<boolean> = signal(localStorage['token'] !== undefined);

  public userLogin(email: string, password: string) {
    this._http
      .post<LoginResponseBody>(
        'http://localhost:5150/api/patients/login',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .subscribe(res => {
        localStorage['token'] = res.tokenType + ' ' + res.token;
        this._isLoggedIn.set(true);
        this._router.navigateByUrl('/home');
      });
  }

  public get isLoggedIn() {
    return this._isLoggedIn;
  }
}
