import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { LoginGuard } from '../services/services.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../services/guards/admin.guard';

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
            {path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Busqueda Generica'}},
            {path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: {titulo: 'Mantenimiento de Usuario'}},
            {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de Hospitales'}},
            {path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de Medicos'}},
            {path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Edicion de Medico'}},
            {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]},
];


export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);

