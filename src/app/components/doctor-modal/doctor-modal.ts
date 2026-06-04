import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Component, DOCUMENT, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TeamData } from 'interfaces/team.interface';
import { ApiService } from 'models/services/api.service';
import { map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-doctor-modal',
  imports: [AsyncPipe, RouterLink, NgOptimizedImage],
  templateUrl: './doctor-modal.html',
})
export class DoctorModal implements OnInit, OnDestroy {
  private readonly _api: ApiService = inject(ApiService);
  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly _document: Document = inject(DOCUMENT);
  public readonly memberData$: Observable<TeamData> = this._activatedRoute.params.pipe(
    map(params => params['id'] as string),
    switchMap(id => this._api.loadData<TeamData>('team/' + id)),
  );

  private readonly _department$: Observable<string | undefined> = this.memberData$.pipe(
    switchMap(memberData => {
      return this._api.departments$.pipe(
        map(departData => departData.find(depart => depart.id === memberData.departmentId)?.name),
      );
    }),
  );

  public get departName(): Observable<string | undefined> {
    return this._department$;
  }

  ngOnInit(): void {
    this._document.body.classList.add('overflow-hidden');
  }

  ngOnDestroy(): void {
    this._document.body.classList.remove('overflow-hidden');
  }
}
