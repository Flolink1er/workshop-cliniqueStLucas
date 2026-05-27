import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actualite-info',
  imports: [],
  templateUrl: './actualite-info.html',
  styleUrl: './actualite-info.css',
})
export class ActualiteInfo {
  public route = inject(ActivatedRoute);
  public currentActuSlug?: string;

  constructor() {
    this!.route.params.subscribe(params => {
      this.currentActuSlug = params['slug'];
    });

    console.log(this.currentActuSlug);
  }
}
