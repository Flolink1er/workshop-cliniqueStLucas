import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HomeData } from '../../interfaces/home-data';

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

  // private async getHomeData(): Promise<void> {
  //   try {
  //     const response = await axios.get('http://localhost:5150/api/homepage', {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     });

  //     if (response.status === 200) this.pageData = response.data;
  //   } catch (err) {
  //     console.error('Erreur lors de la récupération des données', err);
  //   }
  // }
}
