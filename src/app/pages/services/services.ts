import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceData } from 'models/interfaces/service-data';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services implements OnInit {
  private _route: ActivatedRoute = inject(ActivatedRoute);
  public pageData: ServiceData[] | null = null;

  public phoneNbr(nbr: string): string {
    const formatedNbr: string = nbr.replaceAll(' ', '');
    return `tel:${formatedNbr}`;
  }

  public openDialog(id: string): void {
    const dialog = document.getElementById(id) as HTMLDialogElement;
    dialog.showModal();
  }

  ngOnInit(): void {
    this.pageData = this._route.snapshot.data['servicesData'];
  }
}
