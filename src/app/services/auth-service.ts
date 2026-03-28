import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, firstValueFrom, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http: HttpClient = inject(HttpClient);
  private _router: Router = inject(Router);
  public async isAuthenticated(): Promise<boolean> {
    const token: string | null = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const check$ = this._http.get('http://localhost:5150/api/homepage', { headers }).pipe(
      map(() => true),
      catchError(() => {
        this._router.navigate(['/login']);
        return of(false);
      }),
    );
    return firstValueFrom(check$);
  }
}
