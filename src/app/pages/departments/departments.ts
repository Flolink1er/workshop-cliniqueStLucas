import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Hero } from 'components/hero/hero';
import { InfoCard } from 'components/info-card/info-card';
import { DepartData } from 'interfaces/departments.interface';
import { ApiService } from 'models/services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-departments',
  imports: [AsyncPipe, Hero, InfoCard],
  templateUrl: './departments.html',
  styleUrl: './departments.css',
})
export class Departments {
  private readonly _api: ApiService = inject(ApiService);

  public pageData$: Observable<DepartData[]> = this._api.departmentsData;
}
