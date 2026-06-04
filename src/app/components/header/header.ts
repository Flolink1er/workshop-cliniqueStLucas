import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Cta } from 'interfaces/home-data';
import { UserAccountService } from 'models/services/user-account.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
})
export class Header {
  public readonly account: UserAccountService = inject(UserAccountService);
  public shrinkHeader: WritableSignal<boolean> = signal(true);

  public readonly isLoggedIn: Signal<boolean> = this.account.isLoggedIn;

  public readonly links: Cta[] = [
    { label: 'Accueil', href: '/home' },
    { label: 'Services', href: '/services' },
    { label: 'Équipe', href: '/team' },
    { label: 'Actualités', href: '/news' },
    { label: 'Contact', href: '/contact' },
  ];
}
