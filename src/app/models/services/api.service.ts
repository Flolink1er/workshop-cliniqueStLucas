import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HomeData } from 'models/interfaces/home-data';
import { ServiceData } from 'models/interfaces/service-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly _http: HttpClient = inject(HttpClient);
  private _headers: HttpHeaders = new HttpHeaders().set(
    'Authorization',
    localStorage['token'] as string,
  );
  private readonly _baseUrl: string = 'http://localhost:5150/api/';

  public get homeData(): Observable<HomeData> {
    return this._http.get<HomeData>(this._baseUrl + 'homepage', {
      headers: this._headers,
    });
  }

  public get servicesData(): Observable<ServiceData[]> {
    return this._http.get<ServiceData[]>(this._baseUrl + 'services', {
      headers: this._headers,
    });
  }
}
