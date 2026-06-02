import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Hero } from 'components/hero/hero';
import { InfoCard } from 'components/info-card/info-card';
import { Loader } from 'components/loader/loader';
import { StatCard } from 'components/stat-card/stat-card';
import { ServiceData } from 'interfaces/service-data';
import { TeamData } from 'interfaces/team.interface';
import { Observable } from 'rxjs';
import { ApiService } from 'services/api.service';
import { HomeData } from '../../models/interfaces/home-data';

@Component({
  selector: 'app-home',
  imports: [CommonModule, AsyncPipe, Hero, StatCard, InfoCard, Loader],
  templateUrl: './home.html',
})
export class Home {
  private readonly _api: ApiService = inject(ApiService);
  public readonly homeData$: Observable<HomeData> = this._api.homeData;
  public readonly servicesData$: Observable<ServiceData[]> = this._api.servicesData;
  public readonly teamData$: Observable<TeamData[]> = this._api.teamData;
}
