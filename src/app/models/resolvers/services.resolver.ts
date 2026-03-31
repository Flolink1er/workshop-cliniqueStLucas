import { ResolveFn } from '@angular/router';
import axios from 'axios';
import { ServiceData } from 'models/interfaces/service-data';

export const servicesResolver: ResolveFn<ServiceData[] | null> = async () => {
  try {
    const response = await axios.get('http://localhost:5150/api/services', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch {
    return null;
  }
};
