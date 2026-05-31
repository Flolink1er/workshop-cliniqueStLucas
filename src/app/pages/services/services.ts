import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Hero } from 'components/hero/hero';
import { InfoCard } from 'components/info-card/info-card';
import { ServiceData } from 'models/interfaces/service-data';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { ApiService } from 'services/api.service';

@Component({
  selector: 'app-services',
  imports: [AsyncPipe, ReactiveFormsModule, Hero, InfoCard],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
  private readonly _api: ApiService = inject(ApiService);
  public searchInput = new FormControl<string | null>('');
  public pageData$: Observable<ServiceData[]> = combineLatest([
    this._api.servicesData,
    this.searchInput.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([services, searchTerm]) => {
      const search = (searchTerm || '').toLowerCase();
      return services.filter(service => service.name.toLowerCase().includes(search));
    }),
  );

  public phoneNbr(nbr: string): string {
    const formatedNbr: string = nbr.replaceAll(' ', '');
    return `tel:${formatedNbr}`;
  }
}
