import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  input,
  InputSignal,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'app-stat-card',
  imports: [NgOptimizedImage],
  templateUrl: './stat-card.html',
})
export class StatCard implements OnInit {
  public readonly label: InputSignal<string> = input.required<string>();
  public readonly value: InputSignal<string> = input.required<string>();
  public readonly icon: InputSignal<string> = input.required<string>();
  public readonly animated: InputSignal<boolean | undefined> = input<boolean>();
  private readonly _dynamicValue: WritableSignal<number> = signal(0);
  public readonly dynamicValue: Signal<number> = this._dynamicValue.asReadonly();

  public rollUp(): void {
    const targetValue: number | null = Number(this.value().replace(/\s/g, ''));
    const startValue: number = this.dynamicValue();
    const startTime: number = performance.now();

    if (isNaN(targetValue) || startValue === targetValue) return;

    const easeOutQuad = (t: number): number => t * (2 - t);

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const linearProgress = Math.min(elapsedTime / 1250, 1);

      const easedProgress = easeOutQuad(linearProgress);

      const currentValue = Math.floor(startValue + easedProgress * (targetValue - startValue));
      this._dynamicValue.set(currentValue);

      if (linearProgress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    // const interval = setInterval(() => {
    //   this._dynamicValue.set(Math.floor(this.dynamicValue() + value / 10));
    //   if (this.dynamicValue() === value) clearInterval(interval);
    // }, 100);
  }

  ngOnInit(): void {
    this.rollUp();
  }
}
