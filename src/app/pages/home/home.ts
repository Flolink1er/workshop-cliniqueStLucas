import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceData } from 'interfaces/service-data';
import { TeamData } from 'interfaces/team.interface';
import { Observable } from 'rxjs';
import { ApiService } from 'services/api.service';
import { HomeData } from '../../models/interfaces/home-data';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly _api: ApiService = inject(ApiService);
  public homeData$: Observable<HomeData> = this._api.homeData;
  public servicesData$: Observable<ServiceData[]> = this._api.servicesData;
  public teamData$: Observable<TeamData[]> = this._api.teamData;
  // public pageData$: Observable<HomeData> = this._api.homeData;
}
