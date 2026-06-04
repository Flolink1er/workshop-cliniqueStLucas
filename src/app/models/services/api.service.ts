import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { DepartmentData } from 'interfaces/departments.interface';
import { ActualitesData } from 'interfaces/news.interface';
import { ServiceData } from 'interfaces/services.interface';
import { TeamData } from 'interfaces/team.interface';
import { HomeData } from 'models/interfaces/home-data';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly _http: HttpClient = inject(HttpClient);
  private readonly _baseUrl: string = 'http://localhost:5150/api/';

  private _pipeShare = <T>() => shareReplay<T>({ bufferSize: 1, refCount: true });

  public readonly homePage$: Observable<HomeData> = this.loadData<HomeData>('homepage').pipe(
    this._pipeShare(),
  );
  public readonly services$: Observable<ServiceData[]> = this.loadData<ServiceData[]>(
    'services',
  ).pipe(this._pipeShare());
  public readonly team$: Observable<TeamData[]> = this.loadData<TeamData[]>('team').pipe(
    this._pipeShare(),
  );
  public readonly news$: Observable<ActualitesData[]> = this.loadData<ActualitesData[]>(
    'news',
  ).pipe(this._pipeShare());
  public readonly departments$: Observable<DepartmentData[]> = this.loadData<DepartmentData[]>(
    'departments',
  ).pipe(this._pipeShare());

  private readonly _token: WritableSignal<string> = signal<string>(
    localStorage.getItem('token') || '',
  );
  public readonly token: Signal<string> = this._token.asReadonly();

  public setToken(token: string): void {
    localStorage.setItem('token', token);
    this._token.set(token);
  }

  public loadData<T>(endpoint: string): Observable<T> {
    return this._http.get<T>(`${this._baseUrl}${endpoint}`);
  }

  public sendData<T>(endpoint: string, body: unknown): Observable<T> {
    return this._http.post<T>(`${this._baseUrl}${endpoint}`, body);
  }
}
