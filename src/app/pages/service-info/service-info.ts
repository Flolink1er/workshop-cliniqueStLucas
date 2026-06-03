import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorCard } from 'components/doctor-card/doctor-card';
import { Hero } from 'components/hero/hero';
import { Loader } from 'components/loader/loader';
import { StatCard } from 'components/stat-card/stat-card';
import { ServiceData } from 'interfaces/service-data';
import { TeamData } from 'interfaces/team.interface';
import { ApiService } from 'models/services/api.service';
import { combineLatest, map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-service-info',
  imports: [AsyncPipe, Hero, StatCard, DoctorCard, Loader],
  templateUrl: './service-info.html',
})
export class ServiceInfo {
  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly _api: ApiService = inject(ApiService);

  public pageData$: Observable<ServiceData> = combineLatest([
    this._activatedRoute.params,
    this._api.servicesData,
  ]).pipe(
    map(([params, services]) => {
      const slug = params['slug'] as string;
      const service = services.find(s => s.slug === slug);

      if (!service) throw new Error(`Le service ${slug} est introuvable`);

      return service;
    }),
  );

  public readonly team$: Observable<TeamData[]> = this.pageData$.pipe(
    switchMap(serviceData => {
      return this._api.teamData.pipe(
        map(teamMembers =>
          teamMembers.filter(member => member.departmentId === serviceData.departmentId),
        ),
      );
    }),
  );

  public phoneNbrToLink(phoneNbr: string): string {
    return 'tel:' + phoneNbr.replaceAll(' ', '');
  }
}
