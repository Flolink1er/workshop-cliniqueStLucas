import { Component, inject, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DepartData } from 'interfaces/departments.interface';
import { Section } from 'interfaces/home-data';
import { ServiceData } from 'interfaces/service-data';
import { ApiService } from 'models/services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-info-card',
  imports: [RouterLink],
  templateUrl: './info-card.html',
})
export class InfoCard {
  private readonly _api: ApiService = inject(ApiService);

  public readonly departments$: Observable<DepartData[]> = this._api.departmentsData;

  public readonly sectionInfo: InputSignal<Section | undefined> = input<Section>();
  public readonly serviceInfo: InputSignal<ServiceData | undefined> = input<ServiceData>();

  public readonly tag: InputSignal<string | undefined> = input<string>();
}
