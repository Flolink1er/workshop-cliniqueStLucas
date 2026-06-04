import { Component, inject, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from 'components/footer/footer';
import { Header } from 'components/header/header';
import { ToastsService } from 'models/services/toasts.service';
import { UserAccountService } from 'models/services/user-account.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly _userService: UserAccountService = inject(UserAccountService);
  public readonly toast: ToastsService = inject(ToastsService);
  public readonly isLogged: Signal<boolean> = this._userService.isLoggedIn;

  private readonly alertClasses: Record<string, string> = {
    success: 'alert-success',
    warning: 'alert-warning',
    info: 'alert-info',
    error: 'alert-error',
  };

  public toastClass() {
    const type = this.toast.type();
    return type ? this.alertClasses[type] || '' : '';
  }
}
