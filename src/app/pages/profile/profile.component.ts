import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../services/services.index';
import { Usuario } from '../../models/usuario.model';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  public usuario: any;

  public imagenSubir: File;
  public imagenTemporal: string;

  constructor(public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  seleccionImagen(  event: any ) {
    const file: File = event.target.files[0];

    if (!file) {
      this.imagenSubir = null;
      return;
    }

    if ( file.type.indexOf('image') < 0) {
      swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
    }
    this.imagenSubir = file;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(file);

    reader.onloadend = ( ) => this.imagenTemporal = reader.result.toString();

  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }


  guardar(usuario: Usuario) {

    this.usuario.nombre = usuario.nombre;

    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }
    this._usuarioService.actualizarUsuario(this.usuario).subscribe(resp => {
    });

  }

}