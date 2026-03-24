import { Routes } from '@angular/router';
import { authGuard } from 'guards/auth-guard';
import { Home } from 'pages/home/home';
import { Login } from 'pages/login/login';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    title: 'Clinique St-Lucas | Accueil',
    loadComponent: () => Home,
  },
  { path: 'login', title: 'Clinique St-Lucas | Connexion', loadComponent: () => Login },
  { path: '**', redirectTo: '' },
];
