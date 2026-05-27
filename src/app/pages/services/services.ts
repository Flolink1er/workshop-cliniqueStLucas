import { AsyncPipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { ServiceData } from 'models/interfaces/service-data';
import { Observable } from 'rxjs';
import { ApiService } from 'services/api.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
  private readonly _api: ApiService = inject(ApiService);
  public pageData$?: Observable<ServiceData[]>;

  public phoneNbr(nbr: string): string {
    const formatedNbr: string = nbr.replaceAll(' ', '');
    return `tel:${formatedNbr}`;
  }

  public openDialog(id: string): void {
    const dialog = document.getElementById(id) as HTMLDialogElement;
    dialog.showModal();
  }

  constructor() {
    effect(() => {
      this.pageData$ = this._api.servicesData;
    });
  }
}
