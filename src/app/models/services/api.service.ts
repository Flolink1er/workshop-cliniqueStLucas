import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ActualitesData } from 'interfaces/actualites-data';
import { DepartData } from 'interfaces/departments.interface';
import { TeamData } from 'interfaces/team.interface';
import { HomeData } from 'models/interfaces/home-data';
import { ServiceData } from 'models/interfaces/service-data';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly _http: HttpClient = inject(HttpClient);
  private readonly _baseUrl: string = 'http://localhost:5150/api/';

  private readonly _homePage$: Observable<HomeData> = this.loadData<HomeData>('homepage').pipe(
    shareReplay(1),
  );
  private readonly _services$: Observable<ServiceData[]> = this.loadData<ServiceData[]>(
    'services',
  ).pipe(shareReplay(1));
  private readonly _team$: Observable<TeamData[]> = this.loadData<TeamData[]>('team').pipe(
    shareReplay(1),
  );
  private readonly _news$: Observable<ActualitesData[]> = this.loadData<ActualitesData[]>(
    'news',
  ).pipe(shareReplay(1));
  private readonly _departments$ = this.loadData<DepartData[]>('departments').pipe(shareReplay(1));

  public token: WritableSignal<string> = signal<string>(localStorage.getItem('token') || '');

  public get homeData(): Observable<HomeData> {
    return this._homePage$;
  }

  public get servicesData(): Observable<ServiceData[]> {
    return this._services$;
  }

  public get teamData(): Observable<TeamData[]> {
    return this._team$;
  }

  public get actualitesData(): Observable<ActualitesData[]> {
    return this._news$;
  }

  public get departmentsData(): Observable<DepartData[]> {
    return this._departments$;
  }

  public loadData<T>(page: string): Observable<T> {
    return this._http.get<T>(this._baseUrl + page);
  }

  public sendData(page: string, body: object): Observable<object> {
    return this._http.post(this._baseUrl + page, body);
  }
}
