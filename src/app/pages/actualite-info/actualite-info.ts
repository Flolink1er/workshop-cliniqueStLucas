import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActualitesData } from 'interfaces/actualites-data';
import { ApiService } from 'models/services/api.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-actualite-info',
  imports: [DatePipe],
  templateUrl: './actualite-info.html',
  styleUrl: './actualite-info.css',
})
export class ActualiteInfo implements OnInit {
  public readonly route = inject(ActivatedRoute);
  public readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);

  public currentActu?: ActualitesData;

  ngOnInit(): void {
    combineLatest([this.route.params, this.apiService.actualitesData]).subscribe(
      ([params, actus]) => {
        this.currentActu = actus.find(actu => actu.slug === params['slug']);

        if (this.currentActu) {
          this.currentActu.image =
            'https://images.cnrs.fr/system/files/styles/full_image_desktop_watermark/private/media/images/2011/07/CNRS_20110001_1747_42944.jpg?itok=CH6YBufm';
        }

        this.cdr.detectChanges();
      },
    );
  }
}
