import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu = [];
  // menu: any = [
  //   {titulo: 'Principalaa',
  //   icon: 'mdi mdi-package-variant-closed',
  //   submenu: [
  //     {titulo: 'Dashboardc', url: '/dashboard'},
  //     {titulo: 'Progressbar', url: '/progress'},
  //     {titulo: 'Graficas', url: '/grafica1'}
  //   ]
  // },
  // {
  //   titulo: 'Mantenimiento',
  //   icon: 'mdi mdi-folder-lock-open',
  //   submenu: [
  //     {titulo: 'Usuarios', url: '/usuarios'},
  //     {titulo: 'Hospitales', url: '/hospitales'},
  //     {titulo: 'Medicos', url: '/medicos'},
  //   ]
  // }

  // ];
  constructor(public _usuarioService: UsuarioService) {}

  cargarMenu() {
    this.menu = this._usuarioService.menu;
  }


}
