import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import axios from 'axios';
import { HomeData } from '../../interfaces/home-data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  public pageData: HomeData | null = null;

  async ngOnInit() {
    await this.getHomeData();
  }

  private async getHomeData(): Promise<void> {
    try {
      const response = await axios.get('http://localhost:5150/api/homepage', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) this.pageData = response.data;
    } catch (err) {
      console.error('Erreur lors de la récupération des données', err);
    }
  }
}
