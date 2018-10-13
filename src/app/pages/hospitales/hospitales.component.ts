import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  public cargando = true;
  public hospitales: Hospital[] = [];
  public desde = 0;
  public total = 0;

  constructor(public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe( resp => {
      this.cargarHospitales();
      swal('Ben!', `Imagen actualizada`, 'success');
    });
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales(this.desde).subscribe( (resp: any) => {
      this.hospitales = resp.hospitales;
      this.total = resp.total;
      this.cargando = false;
    });
  }

  buscarHospital(termino: string) {
    if ( termino.length < 1) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;
    this._hospitalService.buscarHospital(termino).subscribe( (resp: any) => {
      this.hospitales = resp;
      this.cargando = false;
    });
  }

  cambiarDesde(cantidad: number) {
    const desde = this.desde + cantidad;

    if (desde >= this.total || desde < 0) {
      return;
    }

    this.desde += cantidad;
    this.cargarHospitales();
  }

  mostrarModal( id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }

  borrarHospital(hospital: Hospital) {
    swal({
      title: 'Esta Seguro?',
      text: 'Esta a punto de borrar un hospital!',
      icon: 'warning',
      buttons: {
        cancel: true,
        confirm: true,
      },
    }).then((borrar) => {
      if (borrar) {
        this._hospitalService.borrarHospital(hospital).subscribe( ( hospitalDelete: Hospital ) => {
          this.cargarHospitales();
          swal('Bien!', `Hospital ${ hospitalDelete.nombre } eliminado correctamente.`, 'success');
        });
      }
    });
  }

  guardarHospital(hospital: Hospital, newName: string) {
    if (hospital.nombre === newName) {
      return;
    }
    hospital.nombre = newName;
    this._hospitalService.actualizarHospital(hospital).subscribe( (hospitalActualizado: Hospital) => {
      console.log(hospitalActualizado);
      this.cargarHospitales();
      swal('Ben!', `Hospital ${ hospitalActualizado.nombre } actualizado`, 'success');
    });
  }

  crearHospital() {
    swal({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del Hopsital',
      content: 'input',
      buttons: true,
      dangerMode: true
    }).then( (valor: string) => {
      if (!valor || valor.length === 0) {
        return;
      }
      this._hospitalService.crearHospital(valor).subscribe( (hospital: Hospital) => {
        this.cargarHospitales();
        swal('Ben!', `Hospital ${ hospital.nombre } creado`, 'success');
      });
    });
  }

}
