import { Routes } from '@angular/router';
import { loggedInGuard } from 'models/guards/logged-in.guard';
import { loggedOffGuard } from 'models/guards/logged-off.guard';
import { ActualiteInfo } from 'pages/actualite-info/actualite-info';
import { Actualites } from 'pages/actualites/actualites';
import { Error } from 'pages/error/error';
import { Home } from 'pages/home/home';
import { Login } from 'pages/login/login';
import { ServiceInfo } from 'pages/service-info/service-info';
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
  { path: 'services/:id', title: 'Services', component: ServiceInfo, canActivate: [loggedInGuard] },

  { path: 'actualites', title: 'Actualités', component: Actualites, canActivate: [loggedInGuard]},
  { path: 'actualites/:id', title: 'Actualités', component: ActualiteInfo, canActivate: [loggedInGuard]},

  { path: 'error', title: 'Error', component: Error },
  { path: '**', redirectTo: 'home' },
];
