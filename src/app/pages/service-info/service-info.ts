import { AsyncPipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceData } from 'interfaces/service-data';
import { ApiService } from 'models/services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-service-info',
  imports: [AsyncPipe],
  templateUrl: './service-info.html',
  styleUrl: './service-info.css',
})
export class ServiceInfo {
  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly _api: ApiService = inject(ApiService);
  public pageData$?: Observable<ServiceData>;

  constructor() {
    effect(() => {
      this._activatedRoute.params.subscribe(params => {
        const id: string = params['id'];
        this.pageData$ = this._api.loadData<ServiceData>('services/' + id);
      });
    });
  }
}
