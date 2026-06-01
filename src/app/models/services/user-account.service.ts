import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiService } from './api.service';

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
  private readonly _api: ApiService = inject(ApiService);
  private readonly _http: HttpClient = inject(HttpClient);
  private readonly _router: Router = inject(Router);
  private _isLoggedIn: WritableSignal<boolean> = signal(localStorage['token'] !== undefined);

  public async userLogin(email: string, password: string): Promise<void> {
    try {
      const res = await firstValueFrom(
        this._http.post<LoginResponseBody>(
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
        ),
      );

      this._api.token.set(`${res.tokenType} ${res.token}`);
      localStorage.setItem('token', this._api.token());
      this._isLoggedIn.set(this._api.token() !== '');
      await this._router.navigateByUrl('/home');
    } catch (err) {
      console.error('Échec de la connexion', err);
    }
  }

  public get isLoggedIn() {
    return this._isLoggedIn;
  }
}
