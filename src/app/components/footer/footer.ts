import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DepartmentData } from 'interfaces/departments.interface';
import { ServiceData } from 'interfaces/services.interface';
import { ApiService } from 'models/services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './footer.html',
})
export class Footer {
  private readonly _api: ApiService = inject(ApiService);
  public readonly services$: Observable<ServiceData[]> = this._api.services$;
  public readonly departments$: Observable<DepartmentData[]> = this._api.departments$;
}
