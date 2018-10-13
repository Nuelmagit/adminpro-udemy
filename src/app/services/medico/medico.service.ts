import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  public totalMedicos = 0;

  constructor(private http: HttpClient) {
   }

   cargarMedicos(desde: number = 0) {
    const url = URL_SERVICES + '/medico?desde=' + desde + '&token=' + localStorage.getItem('token');

    return this.http.get(url).pipe( map( (resp: any) => {
      this.totalMedicos = resp.total;
      return resp.medicos;
    } ) );
  }

  buscarMedico(termino: string) {
    const url = URL_SERVICES + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get(url).pipe( map( (resp: any) => resp.medicos ) );
  }

  cargarMedico(id: string) {
    const url = URL_SERVICES + '/medico/' + id;

    return this.http.get(url).pipe( map( (resp: any) => resp.medico ) );
  }

  borrarMedico(medico: Medico) {
    const url = URL_SERVICES + '/medico/' + medico._id + '?token=' + localStorage.getItem('token');

    return this.http.delete(url).pipe ( map( (resp: any) => resp.medico ) );
  }

  guardarMedico(medico: Medico) {
    let url = URL_SERVICES + '/medico' ;

    if (medico._id) {
      url += '/' + medico._id + '?token=' + localStorage.getItem('token');
      return this.http.put(url, medico).pipe( map( (resp: any) => {
        console.log(resp);
        return resp.medico;

      }));
    }
    url += '?token=' + localStorage.getItem('token');
    return this.http.post(url, medico).pipe( map( (resp: any) => {
      return resp.medico;
    } ) );
  }


}
