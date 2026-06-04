import { NgOptimizedImage } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DepartmentData } from 'interfaces/departments.interface';
import { Section } from 'interfaces/home-data';
import { ServiceData } from 'interfaces/services.interface';

@Component({
  selector: 'app-info-card',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './info-card.html',
})
export class InfoCard {
  public readonly departmentInfo: InputSignal<DepartmentData | undefined> = input<DepartmentData>();
  public readonly sectionInfo: InputSignal<Section | undefined> = input<Section>();
  public readonly serviceInfo: InputSignal<ServiceData | undefined> = input<ServiceData>();
  public readonly tag: InputSignal<string | undefined> = input<string>();

  public get link(): string {
    if (this.sectionInfo()) return '/' + this.sectionInfo()?.id;
    if (this.serviceInfo()) return '/services/' + this.serviceInfo()?.slug;
    if (this.departmentInfo()) return '/departments/' + this.departmentInfo()?.slug;
    return '';
  }
}
