import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DepartData } from 'interfaces/departments.interface';
import { ApiService } from 'models/services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-departments',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './departments.html',
  styleUrl: './departments.css',
})
export class Departments {
  private readonly _api: ApiService = inject(ApiService);

  public pageData$: Observable<DepartData[]> = this._api.departmentsData;
}
