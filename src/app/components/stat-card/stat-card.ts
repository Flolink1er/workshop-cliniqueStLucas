import { NgOptimizedImage } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  imports: [NgOptimizedImage],
  templateUrl: './stat-card.html',
})
export class StatCard {
  public readonly label: InputSignal<string> = input.required<string>();
  public readonly value: InputSignal<string> = input.required<string>();
  public readonly icon: InputSignal<string> = input.required<string>();
}
