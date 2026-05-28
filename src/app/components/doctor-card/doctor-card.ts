import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TeamData } from 'interfaces/team.interface';
import { ApiService } from 'models/services/api.service';
import { Observable, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-doctor-card',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './doctor-card.html',
  styleUrl: './doctor-card.css',
})
export class DoctorCard {
  private readonly _api: ApiService = inject(ApiService);
  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  public readonly memberData$: Observable<TeamData> = this._activatedRoute.params.pipe(
    map(params => params['id'] as string),
    switchMap(id => this._api.loadData<TeamData>('team/' + id)),
  );

  private readonly _department$: Observable<string | undefined> = this.memberData$.pipe(
    switchMap(memberData => {
      return this._api.departmentsData.pipe(
        map(departData => departData.find(depart => depart.id === memberData.departmentId)?.name),
      );
    }),
  );

  public get departName() {
    return this._department$;
  }
}
