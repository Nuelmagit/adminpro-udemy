import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  public imagenSubir: File;
  public imagenTemporal: string;

  constructor(public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService) { }

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

  cerrarModal() {
    this.imagenTemporal = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }

  subirImagen() {
   this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id).then( resp => {
    this._modalUploadService.notificacion.emit(resp );
    this.cerrarModal();
   }).catch( err => {
     console.log('error en la carga');
   });
  }

}
