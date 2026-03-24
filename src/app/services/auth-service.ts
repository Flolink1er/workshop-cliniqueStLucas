import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _router: Router = inject(Router);
  public async isAuthenticated(): Promise<boolean> {
    return await axios
      .get('http://localhost:5150/api/homepage', {
        headers: {
          Authorization: `Bearer ${localStorage['token']}`,
        },
      })
      .then((res) => {
        const success: boolean = res.status === 200;
        if (!success) this._router.navigate(['/login']);
        return success;
      })
      .catch((err) => {
        console.error('error ' + err.response.status + ':', 'Access Unauthorized');
        this._router.navigate(['/login']);
        return false;
      });
  }
}
