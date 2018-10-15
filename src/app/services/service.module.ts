import { AdminGuard } from './guards/admin.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SharedService, SidebarService, UsuarioService, SubirArchivoService } from './services.index';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuard } from './services.index';
import { ModalUploadService } from '../pages/modal-upload/modal-upload.service';
import { VerificaTokenGuard } from './guards/verifica-token.guard';

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
    LoginGuard,
    AdminGuard,
    VerificaTokenGuard,
    ModalUploadService
  ]
})
export class ServiceModule { }
