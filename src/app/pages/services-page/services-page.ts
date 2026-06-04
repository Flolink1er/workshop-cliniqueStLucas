import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Hero } from 'components/hero/hero';
import { InfoCard } from 'components/info-card/info-card';
import { Loader } from 'components/loader/loader';
import { ServiceData } from 'interfaces/services.interface';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { ApiService } from 'services/api.service';

@Component({
  selector: 'app-services',
  imports: [AsyncPipe, ReactiveFormsModule, Hero, InfoCard, Loader],
  templateUrl: './services-page.html',
})
export class ServicesPage {
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
