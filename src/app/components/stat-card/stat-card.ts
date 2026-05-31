import { Component, input, InputSignal } from '@angular/core';
import { Stat } from 'interfaces/home-data';

@Component({
  selector: 'app-stat-card',
  imports: [],
  templateUrl: './stat-card.html',
})
export class StatCard {
  public readonly stat: InputSignal<Stat> = input.required<Stat>();
}
