import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable()
export class AppTitleStrategy extends TitleStrategy {
  private readonly _title: Title = inject(Title);

  public updateTitle(snapshot: RouterStateSnapshot): void {
    const pageTitle: string = this.buildTitle(snapshot) || this._title.getTitle();
    this._title.setTitle(`Clinique St-Lucas - ${pageTitle}`);
  }
}
