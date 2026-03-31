import { ResolveFn } from '@angular/router';
import axios from 'axios';
import { HomeData } from 'models/interfaces/home-data';

export const homeResolver: ResolveFn<HomeData | null> = async () => {
  try {
    const response = await axios.get('http://localhost:5150/api/homepage', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch {
    return null;
  }
};
