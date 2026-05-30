import { Component, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface LinkObject {
  label: string;
  url: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public shrinkHeader: WritableSignal<boolean> = signal(true);

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
