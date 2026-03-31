import { Routes } from '@angular/router';
import { mainGuard } from 'models/guards/combined-guard';
import { homeResolver } from 'models/resolvers/home.resolver';
import { servicesResolver } from 'models/resolvers/services.resolver';
import { Error } from 'pages/error/error';
import { Home } from 'pages/home/home';
import { Login } from 'pages/login/login';
import { Services } from 'pages/services/services';

export const routes: Routes = [
  {
    path: '',
    canActivate: [mainGuard],
    resolve: { homeData: homeResolver },
    title: 'Accueil',
    component: Home,
  },
  { path: 'login', title: 'Connexion', component: Login },
  {
    path: 'services',
    resolve: { servicesData: servicesResolver },
    title: 'Services',
    component: Services,
  },
  { path: 'error', title: 'Error', component: Error },
  { path: '**', redirectTo: '' },
];
