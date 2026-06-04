import { Injectable, signal } from '@angular/core';
import { ErrorObject, ReadOnlyErrorObject } from 'interfaces/error.interface';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private _lastError: ErrorObject = {
    code: signal<number | null>(null),
    message: signal<string | null>(null),
  };

  public get lastError(): ReadOnlyErrorObject {
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
