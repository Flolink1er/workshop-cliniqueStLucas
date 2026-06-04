import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponseBody } from 'interfaces/login.interface';
import { firstValueFrom } from 'rxjs';
import { ApiService } from './api.service';
import { ToastsService } from './toasts.service';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  private readonly _api: ApiService = inject(ApiService);
  private readonly _http: HttpClient = inject(HttpClient);
  private readonly _router: Router = inject(Router);
  private readonly _toast: ToastsService = inject(ToastsService);
  private readonly _isLoggedIn: WritableSignal<boolean> = signal(!!localStorage.getItem('token'));
  public readonly isLoggedIn: Signal<boolean> = this._isLoggedIn.asReadonly();
  public readonly username: WritableSignal<string> = signal(localStorage.getItem('username') || '');

  public setLoggedState(state: boolean): void {
    this._isLoggedIn.set(state);
  }

  public async userLogin(email: string, password: string): Promise<void> {
    try {
      const res = await firstValueFrom(
        this._http.post<LoginResponseBody>('http://localhost:5150/api/patients/login', {
          email,
          password,
        }),
      );

      this._api.setToken(`${res.tokenType} ${res.token}`);
      this._isLoggedIn.set(this._api.token() !== '');
      this.username.set(res.user.name);
      localStorage.setItem('username', this.username());
      this._toast.show('success', 'Connexion réussie', 'Vous êtes maintenant connecté·e.');
      await this._router.navigateByUrl('/home');
    } catch (err) {
      this._toast.show('error', 'Échec de la connexion', `Erreur lors de la connexion: ${err}`);
    }
  }

  public userLogout(): void {
    this.setLoggedState(false);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.username.set('');
    this._toast.show('info', 'Information', 'Vous avez été déconnecté.');
    this._router.navigateByUrl('/login');
  }
}
