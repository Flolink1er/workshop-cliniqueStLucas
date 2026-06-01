import { Component, inject, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from 'components/footer/footer';
import { Header } from 'components/header/header';
import { UserAccountService } from 'models/services/user-account.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly _userService: UserAccountService = inject(UserAccountService);
  public readonly isLogged: Signal<boolean> = this._userService.isLoggedIn;
}
