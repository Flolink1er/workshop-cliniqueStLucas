import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserAccountService } from 'models/services/user-account.service';

interface LinkObject {
  label: string;
  url: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
})
export class Header {
  private readonly _account: UserAccountService = inject(UserAccountService);
  public shrinkHeader: WritableSignal<boolean> = signal(true);

  public readonly isLoggedIn = this._account.isLoggedIn;

  public readonly links: LinkObject[] = [
    { label: 'Accueil', url: '/home' },
    { label: 'Services', url: '/services' },
    { label: 'Équipe', url: '/team' },
    { label: 'Actualités', url: '/news' },
    { label: 'Contact', url: '/contact' },
  ];

  constructor() {
    this.animateHeader();
  }

  private animateHeader(): void {
    window.onscroll = () => {
      this.shrinkHeader.set(window.pageYOffset <= 120);
    };
  }
}
