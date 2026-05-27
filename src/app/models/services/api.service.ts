import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ActualitesData } from 'interfaces/actualites-data';
import { HomeData } from 'models/interfaces/home-data';
import { ServiceData } from 'models/interfaces/service-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly _http: HttpClient = inject(HttpClient);
  private readonly _baseUrl: string = 'http://localhost:5150/api/';
  private _pagesData: Record<number, WritableSignal<unknown>> = {
    0: signal(this.loadData<HomeData>('homepage')),
    1: signal(this.loadData<ServiceData[]>('services')),
    3: signal(this.loadData<ActualitesData[]>('news')),
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

  public get actualitesData(): Observable<ActualitesData[]> {
    return this._pagesData[3]() as Observable<ActualitesData[]>;
  }

  public loadData<T>(page: string): Observable<T> {
    return this._http.get<T>(this._baseUrl + page, {
      headers: this._headers,
    });
  }
}
