import { Routes } from '@angular/router';
import { mainGuard } from 'guards/combined-guard';
import { Error } from 'pages/error/error';
import { Home } from 'pages/home/home';
import { Login } from 'pages/login/login';
import { homeResolver } from './home.resolver';

export const routes: Routes = [
  {
    path: '',
    canActivate: [mainGuard],
    resolve: { homeData: homeResolver },
    title: 'Accueil',
    component: Home,
  },
  { path: 'login', title: 'Connexion', component: Login },
  { path: 'error', title: 'Error', component: Error },
  { path: '**', redirectTo: '' },
];
