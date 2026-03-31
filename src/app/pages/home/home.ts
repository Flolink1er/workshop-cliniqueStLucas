import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HomeData } from '../../models/interfaces/home-data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private _route = inject(ActivatedRoute);
  public pageData: HomeData | null = null;

  ngOnInit() {
    this.pageData = this._route.snapshot.data['homeData'];
  }
}
