import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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
  private token?: string;

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
        this.token = res.tokenType + ' ' + res.token;
        localStorage['token'] = this.token;
        this._router.navigateByUrl('/home');
      });
  }

  public get isLoggedIn(): boolean {
    return localStorage['token'] !== '';
  }
}
