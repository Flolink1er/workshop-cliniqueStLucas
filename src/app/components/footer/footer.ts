import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DepartData } from 'interfaces/departments.interface';
import { ServiceData } from 'interfaces/service-data';
import { ApiService } from 'models/services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  private readonly _api: ApiService = inject(ApiService);

  public readonly services$: Observable<ServiceData[]> = this._api.servicesData;
  public readonly departments$: Observable<DepartData[]> = this._api.departmentsData;
}
