import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient,
    public _router: Router) {
    this.cargarStorage();
  }

  estaLogeado() {
    return ( this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  crearUsuario(usuario: Usuario) {
    const URL = URL_SERVICES + '/usuario';

    return this.http.post(URL, usuario).pipe( map( (data: any) => {
      swal('Usuario Creado', data.usuario.email, 'success');
      return data.usuario;
    } ) );
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logOut() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this._router.navigate(['/login']);
  }

  loginGoogle(token: string ) {
    const URL = URL_SERVICES + '/login/google';

    return this.http.post(URL, {token: token}).pipe( map( (data: any) => {
      this.guardarStorage(data.id, data.token, data.usuario);
      return true;
    }));

  }

  login(usuario: Usuario, recordar: boolean = false) {
    const URL = URL_SERVICES + '/login';
    if ( recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    return this.http.post(URL, usuario)
      .pipe( map( (data: any) => {
          this.guardarStorage(data.id, data.token, data.usuario);
          return true;
      }));
  }
}
