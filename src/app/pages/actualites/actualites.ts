import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActualitesData } from 'interfaces/actualites-data';
import { ApiService } from 'models/services/api.service';

@Component({
  selector: 'app-actualites',
  imports: [RouterLink],
  templateUrl: './actualites.html',
  styleUrl: './actualites.css',
})
export class Actualites {
  public readonly apiService = inject(ApiService);
  public actus = signal<ActualitesData[]>([]);
  // public readonly actus: Observable<ActualitesData[]> = this.apiService.actualitesData;
  constructor() {
    this.apiService.actualitesData.subscribe(actusArray =>
      actusArray.forEach(actu => {
        console.log(actu);

        this.actus.update(current => [...current, actu]);
      }),
    );
  }
}
