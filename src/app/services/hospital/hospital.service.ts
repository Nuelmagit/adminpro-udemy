import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';
import { Hospital } from '../../models/hospital.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(public http: HttpClient) { }

  cargarHospitales(desde: number = 0) {
    const url = URL_SERVICES + '/hospital?desde=' + desde;

    return this.http.get(url);
  }

  obtenerHospital( id: string ) {

  }

  borrarHospital(	hospital:	Hospital	) {
    const url = URL_SERVICES + '/hospital/' + hospital._id + '?token=' + localStorage.getItem('token');

    return this.http.delete(url).pipe( map( (resp: any ) => {
      return resp.hospital;
    }));
  }

  crearHospital(	nombre:	string	) {
    const url = URL_SERVICES + '/hospital' + '?token=' + localStorage.getItem('token');
    return this.http.post(url, {nombre}).pipe( map( (resp: any) => {
      return resp.hospital;
    } ) );
  }

  buscarHospital(	termino:	string	) {
    const url = URL_SERVICES + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url).pipe( map( (resp: any) => {
      return resp.hospitales;
    } )  );
  }

  actualizarHospital(	hospital:	Hospital	) {
    const url = URL_SERVICES + '/hospital/' + hospital._id + '?token=' + localStorage.getItem('token');
    return this.http.put(url, hospital).pipe( map( (resp: any ) => {
      return resp.hospital;
    }));
  }

  buscarHospitalPorId(id: string) {
    const url = URL_SERVICES + '/hospital/' + id;
    return this.http.get(url).pipe( map( (resp: any) => {
      return resp.hospital;
    } ) );

  }

}
