import { Routes } from '@angular/router';
import { loggedInGuard } from 'models/guards/logged-in.guard';
import { loggedOffGuard } from 'models/guards/logged-off.guard';
import { Error } from 'pages/error/error';
import { Home } from 'pages/home/home';
import { Login } from 'pages/login/login';
import { Services } from 'pages/services/services';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Accueil',
    component: Home,
    canActivate: [loggedInGuard],
  },
  { path: 'login', title: 'Connexion', component: Login, canActivate: [loggedOffGuard] },
  {
    path: 'services',
    title: 'Services',
    component: Services,
    canActivate: [loggedInGuard],
  },
  { path: 'error', title: 'Error', component: Error },
  { path: '**', redirectTo: 'home' },
];
