import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Loader } from 'components/loader/loader';
import { ApiService } from 'models/services/api.service';
import { ToastsService } from 'models/services/toasts.service';
import { Observable } from 'rxjs';

interface RegisterResponse {
  message: string;
}

@Component({
  selector: 'app-register-page',
  imports: [AsyncPipe, Loader],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  private readonly _api: ApiService = inject(ApiService);

  private readonly _toast: ToastsService = inject(ToastsService);
  public readonly registerData$: Observable<RegisterResponse> =
    this._api.sendData<RegisterResponse>('patients/register', {});

  constructor() {
    this.registerData$.subscribe({
      next: res => {
        this._toast.show('info', 'Information', res.message);
      },
      error: err => {
        this._toast.show('error', 'error', err.message);
      },
    });
  }
}
