import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DepartData } from 'interfaces/departments.interface';
import { TeamData } from 'interfaces/team.interface';
import { ApiService } from 'models/services/api.service';
import { map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-departments-info',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './departments-info.html',
  styleUrl: './departments-info.css',
})
export class DepartmentsInfo {
  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly _api: ApiService = inject(ApiService);
  public pageData$: Observable<DepartData> = this._activatedRoute.params.pipe(
    map(params => params['id'] as string),
    switchMap(id => this._api.loadData<DepartData>('departments/' + id)),
  );

  public readonly team$: Observable<TeamData[]> = this.pageData$.pipe(
    switchMap(DepartData => {
      return this._api.teamData.pipe(
        map(teamMembers => teamMembers.filter(member => member.departmentId === DepartData.id)),
      );
    }),
  );
}
