import { DatePipe, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ActualitesData } from 'interfaces/news.interface';
import { ApiService } from 'models/services/api.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-news-info',
  imports: [DatePipe, RouterLink, NgClass],
  templateUrl: './news-info.html',
})
export class NewsInfo implements OnInit {
  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly _apiService: ApiService = inject(ApiService);
  private readonly _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  public currentActu?: ActualitesData;
  public annexedActu: ActualitesData[] = [];

  ngOnInit(): void {
    combineLatest([this._activatedRoute.params, this._apiService.news$]).subscribe(
      ([params, actus]) => {
        this.currentActu = actus.find(actu => actu.slug === params['slug']);

        if (this.currentActu) {
          this.currentActu.image =
            'https://images.cnrs.fr/system/files/styles/full_image_desktop_watermark/private/media/images/2011/07/CNRS_20110001_1747_42944.jpg?itok=CH6YBufm';
        }

        this._cdr.detectChanges();
      },
    );

    this._apiService.news$.subscribe(actus => {
      if (!this.currentActu) {
        this.annexedActu = [];
        return;
      }

      this.annexedActu = actus.filter(
        actu =>
          actu.tags.some(tag => this.currentActu!.tags.includes(tag)) &&
          this.currentActu!.id != actu.id,
      );
      this._cdr.detectChanges();
    });
  }
}
