import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
})
export class Loader {
  public readonly dots: InputSignal<boolean | undefined> = input<boolean>();
}
