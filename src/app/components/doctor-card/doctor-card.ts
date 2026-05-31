import { Component, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TeamData } from 'interfaces/team.interface';

@Component({
  selector: 'app-doctor-card',
  imports: [RouterLink],
  templateUrl: './doctor-card.html',
})
export class DoctorCard {
  public readonly doctor: InputSignal<TeamData> = input.required<TeamData>();
}
