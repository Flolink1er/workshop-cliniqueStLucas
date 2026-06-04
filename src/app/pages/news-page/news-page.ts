import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Hero } from 'components/hero/hero';
import { ActualitesData } from 'interfaces/news.interface';
import { ApiService } from 'models/services/api.service';
import { combineLatest, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-news',
  imports: [RouterLink, Hero, AsyncPipe, DatePipe],
  templateUrl: './news-page.html',
})
export class NewsPage {
  private readonly _apiService: ApiService = inject(ApiService);
  public actus: WritableSignal<ActualitesData[]> = signal<ActualitesData[]>([]);
  public searchInput = new FormControl<string | null>('');

  public pageData$: Observable<ActualitesData[]> = combineLatest([
    this._apiService.news$,
    this.searchInput.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([actus, searchTerm]) => {
      const search = (searchTerm || '').toLowerCase();
      return actus.filter(actu => actu.title.toLowerCase().includes(search));
    }),
  );

  constructor() {
    this._apiService.news$.subscribe(actusArray =>
      actusArray.forEach(actu => {
        this.actus.update(current => [...current, actu]);
      }),
    );
  }
}
