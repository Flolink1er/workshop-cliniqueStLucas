import { Component, inject, OnDestroy } from '@angular/core';
import { Hero } from 'components/hero/hero';
import { ErrorService } from 'models/services/error.service';

@Component({
  selector: 'app-error',
  imports: [Hero],
  templateUrl: './error-page.html',
})
export class ErrorPage implements OnDestroy {
  private readonly _errorService: ErrorService = inject(ErrorService);
  private readonly _errorCode: number = this._errorService.lastError.code()!;
  public errorData = {
    title: this._errorCode === 0 ? 'API Timeout!' : `Erreur ${this._errorCode}`,
    subtitle: this._errorService.lastError.message()!,
  };

  ngOnDestroy(): void {
    this._errorService.clearError();
  }
}
