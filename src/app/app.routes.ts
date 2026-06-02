import { Routes } from '@angular/router';
import { DoctorSheet } from 'components/doctor-sheet/doctor-sheet';
import { errorGuard } from 'models/guards/error.guard';
import { loggedInGuard } from 'models/guards/logged-in.guard';
import { loggedOffGuard } from 'models/guards/logged-off.guard';
import { ActualiteInfo } from 'pages/actualite-info/actualite-info';
import { Actualites } from 'pages/actualites/actualites';
import { Contact } from 'pages/contact/contact';
import { DepartmentsInfo } from 'pages/departments-info/departments-info';
import { Departments } from 'pages/departments/departments';
import { Error } from 'pages/error/error';
import { Home } from 'pages/home/home';
import { Login } from 'pages/login/login';
import { RendezVous } from 'pages/rendez-vous/rendez-vous';
import { ServiceInfo } from 'pages/service-info/service-info';
import { Services } from 'pages/services/services';
import { Team } from 'pages/team/team';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Accueil',
    component: Home,
    canActivate: [loggedInGuard],
  },
  { path: 'login', title: 'Connexion', component: Login, canActivate: [loggedOffGuard] },
  { path: 'services', title: 'Services', component: Services, canActivate: [loggedInGuard] },
  { path: 'services/:id', title: 'Services', component: ServiceInfo, canActivate: [loggedInGuard] },
  {
    path: 'departments',
    title: 'Départements',
    component: Departments,
    canActivate: [loggedInGuard],
  },
  {
    path: 'departments/:id',
    title: 'Départements',
    component: DepartmentsInfo,
    canActivate: [loggedInGuard],
  },
  {
    path: 'team',
    title: 'Équipe',
    component: Team,
    canActivate: [loggedInGuard],
    children: [
      { path: ':id', title: 'Équipe', component: DoctorSheet, canActivate: [loggedInGuard] },
    ],
  },
  { path: 'news', title: 'Actualités', component: Actualites, canActivate: [loggedInGuard] },
  {
    path: 'news/:slug',
    title: 'Actualités',
    component: ActualiteInfo,
    canActivate: [loggedInGuard],
  },
  { path: 'contact', title: 'Contact', component: Contact, canActivate: [loggedInGuard] },
  {
    path: 'rendez-vous',
    title: 'Prendre Rendez-vous',
    component: RendezVous,
    canActivate: [loggedInGuard],
  },
  { path: 'error', title: 'Error', component: Error, canActivate: [errorGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: 'error' },
];
