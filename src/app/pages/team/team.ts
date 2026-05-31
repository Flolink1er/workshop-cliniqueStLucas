import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TeamData } from 'interfaces/team.interface';
import { ApiService } from 'models/services/api.service';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { Hero } from "components/hero/hero";

@Component({
  selector: 'app-team',
  imports: [AsyncPipe, RouterLink, RouterOutlet, ReactiveFormsModule, Hero],
  templateUrl: './team.html',
  styleUrl: './team.css',
})
export class Team {
  private readonly _api: ApiService = inject(ApiService);
  public searchInput = new FormControl<string | null>('');
  public readonly pageData$: Observable<TeamData[]> = combineLatest([
    this._api.teamData,
    this.searchInput.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([members, searchTerm]) => {
      const search = (searchTerm || '').toLowerCase();
      return members.filter(
        member =>
          member.firstName.toLowerCase().includes(search) ||
          member.lastName.toLowerCase().includes(search),
      );
    }),
  );
}
