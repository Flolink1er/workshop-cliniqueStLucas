import { Injectable, signal, WritableSignal } from '@angular/core';

type ToastType = 'success' | 'info' | 'warning' | 'error' | undefined;

@Injectable({
  providedIn: 'root',
})
export class ToastsService {
  private _type: WritableSignal<ToastType> = signal<ToastType>(undefined);
  private _title: WritableSignal<string> = signal<string>('');
  private _message: WritableSignal<string> = signal<string>('');

  public show(type: ToastType, title: string, message: string, duration = 5000): void {
    this._type.set(type);
    this._title.set(title);
    this._message.set(message);

    setTimeout(() => {
      this._type.set(undefined);
      this._title.set('');
      this._message.set('');
    }, duration);
  }

  public get type() {
    return this._type.asReadonly();
  }

  public get title() {
    return this._title.asReadonly();
  }

  public get message() {
    return this._message.asReadonly();
  }

  public get icon() {
    if (this.type() === 'error') return '✕';
    if (this.type() === 'info') return 'ℹ';
    if (this.type() === 'success') return '✓';
    return '!';
  }

  public get isShown(): boolean {
    return !!this._type() && this._title() !== '' && this._message() !== '';
  }
}
