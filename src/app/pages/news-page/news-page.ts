import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from 'components/hero/hero';
import { ActualitesData } from 'interfaces/news.interface';
import { ApiService } from 'models/services/api.service';

@Component({
  selector: 'app-news',
  imports: [RouterLink, Hero],
  templateUrl: './news-page.html',
})
export class NewsPage {
  private readonly _apiService: ApiService = inject(ApiService);
  public actus: WritableSignal<ActualitesData[]> = signal<ActualitesData[]>([]);
  // public readonly actus: Observable<ActualitesData[]> = this.apiService.actualitesData;
  constructor() {
    this._apiService.news$.subscribe(actusArray =>
      actusArray.forEach(actu => {
        this.actus.update(current => [...current, actu]);
      }),
    );
  }
}
