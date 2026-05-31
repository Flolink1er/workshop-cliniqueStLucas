import { Component, input, InputSignal } from '@angular/core';
import { Section } from 'interfaces/home-data';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-info-card',
  imports: [RouterLink],
  templateUrl: './info-card.html',
})
export class InfoCard {
  public readonly sectionInfo: InputSignal<Section | undefined> = input<Section>();
}
