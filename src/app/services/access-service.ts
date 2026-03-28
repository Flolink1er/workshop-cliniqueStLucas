import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, firstValueFrom, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccessService {
  private _http: HttpClient = inject(HttpClient);
  private _router: Router = inject(Router);

  public async responded(): Promise<boolean> {
    const check$ = this._http.get('http://localhost:5150/test').pipe(
      map(() => true),
      catchError(() => {
        this._router.navigate(['/error']);
        return of(false);
      }),
    );
    return firstValueFrom(check$);
  }
}
