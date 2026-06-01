import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
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

  public token = signal<string>(localStorage.getItem('token') || '');

  public get homeData(): Observable<HomeData> {
    return this.loadData<HomeData>('homepage');
  }

  public get servicesData(): Observable<ServiceData[]> {
    return this.loadData<ServiceData[]>('services');
  }

  public get teamData(): Observable<TeamData[]> {
    return this.loadData<TeamData[]>('team');
  }

  public get actualitesData(): Observable<ActualitesData[]> {
    return this.loadData<ActualitesData[]>('news');
  }

  public get departmentsData(): Observable<DepartData[]> {
    return this.loadData<DepartData[]>('departments');
  }

  public loadData<T>(page: string): Observable<T> {
    return this._http.get<T>(this._baseUrl + page);
  }

  public sendData(page: string, body: object): Observable<object> {
    return this._http.post(this._baseUrl + page, body);
  }
}
