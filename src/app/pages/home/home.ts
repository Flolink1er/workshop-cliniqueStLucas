import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'services/api.service';
import { HomeData } from '../../models/interfaces/home-data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly _api: ApiService = inject(ApiService);
  public pageData$?: Observable<HomeData>;

  constructor() {
    effect(() => {
      this.pageData$ = this._api.homeData;
    });
  }
}
