import { Routes } from '@angular/router';
import { Home } from 'pages/home/home';
import { Login } from 'pages/login/login';

export const routes: Routes = [
  { path: '', title: 'Clinique St-Lucas | Accueil', loadComponent: () => Home },
  { path: 'login', title: 'Clinique St-Lucas | Connexion', loadComponent: () => Login },
  { path: '**', redirectTo: '' }
];
