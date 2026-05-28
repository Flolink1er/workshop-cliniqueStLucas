import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface LinkObject {
  label: string;
  url: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public readonly links: LinkObject[] = [
    { label: 'Accueil', url: '/home' },
    { label: 'Services', url: '/services' },
    { label: 'Départements', url: '/departments' },
    { label: 'Actualités', url: '/news' },
    { label: 'Contact', url: '/contact' },
  ];
}
