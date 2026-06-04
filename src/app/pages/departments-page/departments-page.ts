import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Hero } from 'components/hero/hero';
import { InfoCard } from 'components/info-card/info-card';
import { Loader } from 'components/loader/loader';
import { DepartmentData } from 'interfaces/departments.interface';
import { ApiService } from 'models/services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-departments',
  imports: [AsyncPipe, Hero, InfoCard, Loader],
  templateUrl: './departments-page.html',
})
export class DepartmentsPage {
  private readonly _api: ApiService = inject(ApiService);

  public pageData$: Observable<DepartmentData[]> = this._api.departments$;
}
