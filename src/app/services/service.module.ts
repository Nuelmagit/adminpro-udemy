import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SharedService, SidebarService, UsuarioService, SubirArchivoService } from './services.index';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuard } from './services.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    SubirArchivoService,
    LoginGuard
  ]
})
export class ServiceModule { }
