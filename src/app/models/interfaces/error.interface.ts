import { Signal, WritableSignal } from '@angular/core';

export interface ErrorObject {
  code: WritableSignal<number | null>;
  message: WritableSignal<string | null>;
}

export interface ReadOnlyErrorObject {
  code: Signal<number | null>;
  message: Signal<string | null>;
}

export interface TreatedErrorObject {
  code: number | null;
  message: string | null;
}
