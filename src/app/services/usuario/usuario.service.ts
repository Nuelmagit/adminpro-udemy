import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { map, filter, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu = [];

  constructor(public http: HttpClient,
    public _router: Router,
    public uploadFile: SubirArchivoService) {
    this.cargarStorage();
  }

  renuevaToken() {
    const url = URL_SERVICES + '/login/renuevatoken' + '?token=' + this.token;

    return this.http.get( url ).pipe( map( (resp: any) => {
      this.token = resp.token;
      localStorage.setItem('token', resp.token);
      console.log('renovado tokeeeeen1!! yeahh!');
      return true;
    }), catchError( (err: any) => {
      swal('Ops', 'no se renovo el token', 'error');
      this._router.navigate(['/login']);
      return throwError(err.mensaje);
    } ) );
  }

  estaLogeado() {
    return ( this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      this.menu = JSON.parse( localStorage.getItem('menu') );
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  crearUsuario(usuario: Usuario) {
    const URL = URL_SERVICES + '/usuario';

    return this.http.post(URL, usuario).pipe( map( (data: any) => {
      swal('Usuario Creado', data.usuario.email, 'success');
      return data.usuario;
    } ),
    catchError((err: any) => {
      swal(err.error.mensaje, err.error.errors.message, 'error');
      return throwError(err.error);
    })
    );
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logOut() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this._router.navigate(['/login']);
  }

  loginGoogle(token: string ) {
    const URL = URL_SERVICES + '/login/google';

    return this.http.post(URL, {token: token}).pipe( map( (data: any) => {
      this.guardarStorage(data.id, data.token, data.usuario, data.menu);
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
          this.guardarStorage(data.id, data.token, data.usuario, data.menu);
          return true;
      }),
      catchError(err => {
        return throwError(err.error);
      })
      );
  }


  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICES + '/usuario/' + usuario._id;

    url += '?token=' + this.token;
    return this.http.put(url, usuario).pipe( map( (resp: any) => {
      if (usuario._id === this.usuario._id) {
        this.guardarStorage(resp.usuario_id, this.token, resp.usuario, this.menu);
      }

      swal('Usuario Actualizado', usuario.nombre, 'success');
      return true;
    }));
  }

  cambiarImagen(file: File, id: string) {
    this.uploadFile.subirArchivo(file, 'usuarios', id).then( (resp: any) => {
      console.log(resp);

      this.usuario.img = resp.usuario.img;
      swal('Imagen Actualizada', this.usuario.nombre, 'success');
      this.guardarStorage(id, this.token, this.usuario, this.menu);
    } )
    .catch( ( resp ) => {
      console.log(resp);
    });
  }

  cargarUsuarios(desde: number = 0) {
    const url = URL_SERVICES + '/usuario?desde=' + desde;

    return this.http.get(url);
  }

  buscarUsuario(termino: String) {
    const url = URL_SERVICES + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get(url).pipe( map( (resp: any) => resp.usuarios ) );
  }

  borrarUsuario(usuario: Usuario) {
    const url = URL_SERVICES + '/usuario/' + usuario._id + '?token=' + this.token;

    return this.http.delete(url).pipe ( map( (resp: any) => resp.usuario ) );

  }

}
