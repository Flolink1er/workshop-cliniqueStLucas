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

  private readonly loaderStyleClasses: Record<LoaderStyle, string> = {
    ball: 'loading-ball',
    bars: 'loading-bars',
    dots: 'loading-dots',
    infinity: 'loading-infinity',
    ring: 'loading-ring',
    spinner: 'loading-spinner',
  };

  private readonly loaderSizeClasses: Record<LoaderSize, string> = {
    lg: 'loading-lg',
    md: 'loading-md',
    sm: 'loading-sm',
    xl: 'loading-xl',
    xs: 'loading-xs',
  };

  public get loadingClasses(): string {
    const classes = [
      this.loaderStyleClasses[this.loaderStyle() || 'ring'],
      this.loaderSizeClasses[this.loaderSize() || 'md'],
    ];
    return classes.join(' ');
  }
}
