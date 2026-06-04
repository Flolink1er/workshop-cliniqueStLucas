import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { DoctorModal } from 'components/doctor-modal/doctor-modal';
import { errorGuard } from 'models/guards/error.guard';
import { loggedInGuard } from 'models/guards/logged-in.guard';
import { loggedOffGuard } from 'models/guards/logged-off.guard';
import { ErrorService } from 'models/services/error.service';
import { AppointmentPage } from 'pages/appointment-page/appointment-page';
import { ContactPage } from 'pages/contact-page/contact-page';
import { DepartmentsInfo } from 'pages/departments-info/departments-info';
import { DepartmentsPage } from 'pages/departments-page/departments-page';
import { ErrorPage } from 'pages/error-page/error-page';
import { HomePage } from 'pages/home-page/home-page';
import { LoginPage } from 'pages/login-page/login-page';
import { NewsInfo } from 'pages/news-info/news-info';
import { NewsPage } from 'pages/news-page/news-page';
import { RegisterPage } from 'pages/register-page/register-page';
import { ServiceInfo } from 'pages/service-info/service-info';
import { ServicesPage } from 'pages/services-page/services-page';
import { TeamPage } from 'pages/team-page/team-page';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Accueil',
    component: HomePage,
    canActivate: [loggedInGuard],
  },
  {
    path: 'login',
    title: 'Connexion',
    component: LoginPage,
    canActivate: [loggedOffGuard],
  },
  {
    path: 'register',
    title: 'Inscription',
    component: RegisterPage,
    canActivate: [loggedOffGuard],
  },
  {
    path: 'services',
    title: 'Services',
    component: ServicesPage,
    canActivate: [loggedInGuard],
  },
  {
    path: 'services/:slug',
    title: 'Services',
    component: ServiceInfo,
    canActivate: [loggedInGuard],
  },
  {
    path: 'departments',
    title: 'Départements',
    component: DepartmentsPage,
    canActivate: [loggedInGuard],
  },
  {
    path: 'departments/:slug',
    title: 'Départements',
    component: DepartmentsInfo,
    canActivate: [loggedInGuard],
  },
  {
    path: 'team',
    title: 'Équipe',
    component: TeamPage,
    canActivate: [loggedInGuard],
    children: [
      {
        path: ':id',
        title: 'Équipe',
        component: DoctorModal,
        canActivate: [loggedInGuard],
      },
    ],
  },
  {
    path: 'news',
    title: 'Actualités',
    component: NewsPage,
    canActivate: [loggedInGuard],
  },
  {
    path: 'news/:slug',
    title: 'Actualités',
    component: NewsInfo,
    canActivate: [loggedInGuard],
  },
  {
    path: 'contact',
    title: 'Contact',
    component: ContactPage,
    canActivate: [loggedInGuard],
  },
  {
    path: 'rendez-vous',
    title: 'Prendre Rendez-vous',
    component: AppointmentPage,
    canActivate: [loggedInGuard],
  },
  {
    path: 'error',
    title: 'Error',
    component: ErrorPage,
    canActivate: [errorGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '**',
    redirectTo: () => {
      const errorService = inject(ErrorService);
      errorService.lastError = [404, 'Page non trouvée'];
      return 'error';
    },
  },
];
