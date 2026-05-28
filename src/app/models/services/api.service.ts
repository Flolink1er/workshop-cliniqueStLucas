import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ActualitesData } from 'interfaces/actualites-data';
import { DepartData } from 'interfaces/departments.interface';
import { TeamData } from 'interfaces/team.interface';
import { HomeData } from 'models/interfaces/home-data';
import { ServiceData } from 'models/interfaces/service-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly _http: HttpClient = inject(HttpClient);
  private readonly _baseUrl: string = 'http://localhost:5150/api/';
  private _pagesData: Record<number, WritableSignal<any>> = {
    0: signal(this.loadData<HomeData>('homepage')),
    1: signal(this.loadData<ServiceData[]>('services')),
    2: signal(this.loadData<TeamData[]>('team')),
    3: signal(this.loadData<ActualitesData[]>('news')),
    4: signal(this.loadData<DepartData[]>('departments')),
  };

  private get _headers(): HttpHeaders {
    return new HttpHeaders().set('Authorization', (localStorage['token'] || '') as string);
  }

  public get homeData(): Observable<HomeData> {
    return this._pagesData[0]() as Observable<HomeData>;
  }

  public get servicesData(): Observable<ServiceData[]> {
    return this._pagesData[1]() as Observable<ServiceData[]>;
  }

  public get teamData(): Observable<TeamData[]> {
    return this._pagesData[2]() as Observable<TeamData[]>;
  }

  public get actualitesData(): Observable<ActualitesData[]> {
    return this._pagesData[3]() as Observable<ActualitesData[]>;
  }

  public get departmentsData(): Observable<DepartData[]> {
    return this._pagesData[4]() as Observable<DepartData[]>;
  }

  public loadData<T>(page: string): Observable<T> {
    return this._http.get<T>(this._baseUrl + page, {
      headers: this._headers,
    });
  }
}
