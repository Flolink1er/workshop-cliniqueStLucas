import { Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from 'components/footer/footer';
import { Header } from 'components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  public shrinkHeader: WritableSignal<boolean> = signal(false);
  constructor() {
    this.animateHeader();
  }

  private animateHeader(): void {
    window.onscroll = () => {
      this.shrinkHeader.set(window.pageYOffset <= 120);
    };
  }
}
