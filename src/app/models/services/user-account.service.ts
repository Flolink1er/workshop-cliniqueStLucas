import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponseBody } from 'interfaces/login.interface';
import { firstValueFrom } from 'rxjs';
import { ApiService } from './api.service';

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

  public get isLoggedIn(): Signal<boolean> {
    return this._isLoggedIn.asReadonly();
  }
}
