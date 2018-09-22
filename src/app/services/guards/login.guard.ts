import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService,
              public _router: Router) {}

  canActivate() {
    if (this._usuarioService.estaLogeado()) {
      console.log('Paso el Guard');
      return true;
    }
    console.log('Bloqueado por el Guard');
    this._router.navigate(['/login']);
    return false;
  }
}
