import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private _lastError = {
    code: signal<number | null>(null),
    message: signal<string | null>(null),
  };

  public get lastError(): { code: Signal<number | null>; message: Signal<string | null> } {
    return {
      code: this._lastError.code.asReadonly(),
      message: this._lastError.message.asReadonly(),
    };
  }

  public set lastError(params: [number, string]) {
    this._lastError.code.set(params[0]);
    this._lastError.message.set(params[1]);
  }

  public clearError(): void {
    this._lastError.code.set(null);
    this._lastError.message.set(null);
  }
}
