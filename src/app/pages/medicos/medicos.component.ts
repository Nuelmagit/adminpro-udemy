import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  constructor(public _medicoService: MedicoService) { }

  public medicos: Medico[] = [];
  public total = 0;
  public cargando = true;
  public desde = 0;

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.cargando = true;
    this._medicoService.cargarMedicos(this.desde).subscribe ( (medicos: Medico[]) => {
      this.medicos = medicos;
      this.total = this._medicoService.totalMedicos;
      this.cargando = false;
    } );
  }

  buscarMedico(termino: string) {
    if ( termino.length < 1) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;
    this._medicoService.buscarMedico(termino).subscribe( (medicos: Medico[]) => {
      this.medicos = medicos;
      this.cargando = false;
    });
  }

  crearMedico() {

  }

  borrarMedico(medico: Medico) {
    swal({
      title: 'Esta Seguro?',
      text: 'Esta a punto de borrar un medico!',
      icon: 'warning',
      buttons: {
        cancel: true,
        confirm: true,
      },
    }).then((borrar) => {
      if (borrar) {
        this._medicoService.borrarMedico(medico).subscribe( ( medicoDelete: Medico ) => {
          this.cargarMedicos();
          swal('Bien!', `Medico ${ medicoDelete.nombre } eliminado correctamente.`, 'success');
        });
      }
    });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if (desde >= this.total || desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarMedicos();
  }

}
