import { Component, inject, OnDestroy } from '@angular/core';
import { Hero } from 'components/hero/hero';
import { ErrorService } from 'models/services/error.service';

@Component({
  selector: 'app-error',
  imports: [Hero],
  templateUrl: './error.html',
  styleUrl: './error.css',
})
export class Error implements OnDestroy {
  private readonly _errorService: ErrorService = inject(ErrorService);
  public errorData = {
    title: `Erreur ${this._errorService.lastError.code() ?? 404}`,
    subtitle: this._errorService.lastError.message() || 'Page not Found',
  };

  constructor() {
    console.log(this._errorService.lastError.code());
  }

  // constructor() {
  //   switch (this._errorCode) {
  //     case 404:
  //       this.errorData.subtitle = 'Oups… Vous seriez-vous perdu?';
  //       break;
  //     case 401:
  //       this.errorData.subtitle = 'Unauthorized';
  //       break;
  //     default:
  //       this.errorData.title = 'Timeout!';
  //       this.errorData.subtitle = "La connexion avec nos serveurs n'a pas pus être établie.";
  //   }
  // }

  ngOnDestroy(): void {
    this._errorService.clearError();
  }
}
