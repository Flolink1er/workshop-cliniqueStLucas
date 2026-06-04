import { Component, input, InputSignal } from '@angular/core';

type LoaderStyle = 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity';
type LoaderSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
})
export class Loader {
  public readonly loaderStyle: InputSignal<LoaderStyle | undefined> = input<LoaderStyle>();
  public readonly loaderSize: InputSignal<LoaderSize | undefined> = input<LoaderSize>();
}
