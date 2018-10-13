import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/services.index';
import { ModalUploadService } from '../modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde = 0;
  total = 0;
  cargando = true;

  constructor(public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe( resp => {
      this.cargarUsuarios();
    });
  }

  mostrarModal( id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde).subscribe( (resp: any) => {
      console.log(resp);
      this.desde = resp.desde;
      this.total = resp.total;
      this.usuarios = resp.usuario;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    console.log(desde);
    if (desde >= this.total) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario(termino: string) {
    if ( termino.length < 1) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuario(termino).subscribe( resp => {
      console.log(resp);
      this.usuarios = resp;
      this.cargando = false;
    });
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      swal('Ops!', 'No puedes Eliminarte!', 'warning');
      return;
    }

    swal({
      title: 'Esta Seguro?',
      text: 'Esta a punto de borrar un usuario!',
      icon: 'warning',
      buttons: {
        cancel: true,
        confirm: true,
      },
    }).then((borrar) => {
      if (borrar) {
        this._usuarioService.borrarUsuario(usuario).subscribe( ( usuarioDelete: Usuario ) => {
          this.cargarUsuarios();
          swal('Bien!', `Usuario ${ usuarioDelete.nombre } eliminado correctamente.`, 'success');
        });
      }
    });

    // this._usuarioService.borrarUsuario(id);

  }

  guardarUsuario(usuario: Usuario) {
 this._usuarioService.actualizarUsuario(usuario).subscribe();
  }

}
