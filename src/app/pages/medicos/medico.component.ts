import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService } from '../../services/medico/medico.service';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital = new Hospital('');

  constructor(public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService) {
      activatedRoute.params.subscribe( params => {
        const id = params['id'];
        if (id !== 'nuevo') {
          this.cargarMedico(params['id']);
        }
      });
    }

  ngOnInit() {
    this._hospitalService.cargarHospitales().subscribe( (resp: any) => {
      this.hospitales = resp.hospitales;
    } );

    this._modalUploadService.notificacion.subscribe( (resp: any) => {
      this.medico = resp.medico;
    });
  }

  cargarMedico(id: string) {
    this._medicoService.cargarMedico(id).subscribe( (medico: any) => {
      this.medico = medico;
      this.hospital = medico.hospital;
      this.medico.hospital = medico.hospital._id;
      console.log(medico);
    });
  }

  guardarMedico(f: NgForm) {
    if (f.invalid) {
      return;
    }
    console.log(f.value);
    this.medico.nombre = f.value.nombre;
    this.medico.hospital = f.value.hospital;
    this._medicoService.guardarMedico(this.medico).subscribe( (medico: Medico) => {
      swal('Bien!', `Medico ${medico.nombre} guardado correctamente`, 'success');

      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
    } );
  }

  cambioHospital( evento) {
    const id = evento.target.value;

    this._hospitalService.buscarHospitalPorId(id).subscribe( (hospital: Hospital) => {
      this.hospital = hospital;
    } );
  }

  cambiarFoto() {
this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }

}
