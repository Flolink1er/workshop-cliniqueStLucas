import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DoctorCard } from 'components/doctor-card/doctor-card';
import { Hero } from 'components/hero/hero';
import { Loader } from 'components/loader/loader';
import { TeamData } from 'interfaces/team.interface';
import { ApiService } from 'models/services/api.service';
import { combineLatest, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-team',
  imports: [AsyncPipe, RouterOutlet, ReactiveFormsModule, Hero, DoctorCard, Loader],
  templateUrl: './team-page.html',
})
export class TeamPage {
  private readonly _api: ApiService = inject(ApiService);
  public searchInput: FormControl<string | null> = new FormControl<string | null>('');
  public readonly pageData$: Observable<TeamData[]> = combineLatest([
    this._api.teamData,
    this.searchInput.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([members, searchTerm]) => {
      const search: string = (searchTerm || '').toLowerCase();
      return members.filter(
        member =>
          member.firstName.toLowerCase().includes(search) ||
          member.lastName.toLowerCase().includes(search),
      );
    }),
  );
}
