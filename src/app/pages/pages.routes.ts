import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { LoginGuard } from '../services/services.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const pagesRoutes: Routes = [
    {path: '',
    component:
    PagesComponent,
    canActivate: [LoginGuard],
    children: [
            {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
            {path: 'progress', component: ProgressComponent, data: {titulo: 'Progreso'}},
            {path: 'grafica1', component: Graficas1Component, data: {titulo: 'Graficas'}},
            {path: 'accountSetting', component: AccountSettingsComponent, data: {titulo: 'Account'}},
            {path: 'profile', component: ProfileComponent, data: {titulo: 'Perfil'}},
            {path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Mantenimiento de Usuario'}},
            {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]},
];


export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);

