import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Hero } from 'components/hero/hero';
import { ServiceData } from 'interfaces/service-data';
import { TeamData } from 'interfaces/team.interface';
import { ApiService } from 'models/services/api.service';
import { combineLatest, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-rendez-vous',
  imports: [AsyncPipe, ReactiveFormsModule, Hero],
  templateUrl: './rendez-vous.html',
  styleUrl: './rendez-vous.css',
})
export class RendezVous {
  private readonly _api: ApiService = inject(ApiService);
  public readonly services$: Observable<ServiceData[]> = this._api.servicesData;

  public getClosestDate(): string {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 2);
    return this.dateToValue(defaultDate);
  }

  public appointmentForm = new FormGroup({
    doctorId: new FormControl<number | string | null>(null, [
      Validators.pattern(/^-?(?:0|[1-9]\d*)$/gm),
    ]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    firstName: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>('', Validators.required),
    phone: new FormControl<string>('', [Validators.required, Validators.pattern(/^\d{10}$/gm)]),
    preferredDate: new FormControl<string>(this.getClosestDate(), Validators.required),
    reason: new FormControl<string | null>(null),
    serviceId: new FormControl<number | string | null>(null, [
      Validators.pattern(/^-?(?:0|[1-9]\d*)$/gm),
    ]),
  });

  public doctors$: Observable<TeamData[]> = combineLatest([
    this._api.teamData,
    this._api.servicesData,
    this.appointmentForm.controls.serviceId.valueChanges.pipe(
      startWith(this.appointmentForm.value.serviceId),
    ),
  ]).pipe(
    map(([doctors, services, serviceId]) => {
      if (serviceId === null || serviceId === 'null' || serviceId === '') return doctors;

      const selectedServiceId = Number(serviceId);
      const currentService = services.find(s => s.id === selectedServiceId);

      if (!currentService || currentService.departmentId === null) return [];

      return doctors.filter(doctor => doctor.departmentId === currentService.departmentId);
    }),
  );

  public sendData() {
    const body = {
      doctorId: this.appointmentForm.value.doctorId,
      email: this.appointmentForm.value.email,
      firstName: this.appointmentForm.value.firstName,
      lastName: this.appointmentForm.value.lastName,
      phone: this.appointmentForm.value.phone,
      preferredDate: this.appointmentForm.value.preferredDate,
      reason: this.appointmentForm.value.reason,
      serviceId: this.appointmentForm.value.serviceId,
    };

    this._api.sendData('appointments', body).subscribe(res => console.log(res));
  }

  private dateToValue(date: Date): string {
    return date.toISOString().substring(0, 10);
  }

  public isRequired(fieldName: string): boolean {
    const validator = this.appointmentForm.get(fieldName)?.validator?.({} as AbstractControl);
    return validator && validator['required'];
  }
}
