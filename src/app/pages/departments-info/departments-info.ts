import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorCard } from 'components/doctor-card/doctor-card';
import { Hero } from 'components/hero/hero';
import { Loader } from 'components/loader/loader';
import { DepartmentData } from 'interfaces/departments.interface';
import { TeamData } from 'interfaces/team.interface';
import { ApiService } from 'models/services/api.service';
import { combineLatest, map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-departments-info',
  imports: [AsyncPipe, Hero, DoctorCard, Loader],
  templateUrl: './departments-info.html',
})
export class DepartmentsInfo {
  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly _api: ApiService = inject(ApiService);
  public pageData$: Observable<DepartmentData> = combineLatest([
    this._activatedRoute.params,
    this._api.departments$,
  ]).pipe(
    map(([params, departments]) => {
      const slug = params['slug'] as string;
      const department = departments.find(d => d.slug === slug);

      if (!department) throw new Error(`Le département ${slug} est introuvable`);

      return department;
    }),
  );

  public readonly team$: Observable<TeamData[]> = this.pageData$.pipe(
    switchMap(DepartData => {
      return this._api.team$.pipe(
        map(teamMembers => teamMembers.filter(member => member.departmentId === DepartData.id)),
      );
    }),
  );

  public phoneNbrToLink(phoneNbr: string): string {
    return 'tel:' + phoneNbr.replaceAll(' ', '');
  }
}
