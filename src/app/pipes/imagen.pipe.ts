import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    let url = URL_SERVICES + '/img';

    if (!img) {
      return url + '/usuario/xxx';
    }

    if (img.indexOf('https') >= 0 ) {
      return img;
    }

    switch (tipo) {
      case 'usuario':
        url += '/usuarios/' + img;
      break;
      case 'medico':
        url += '/usuarios/' + img;
      break;
      case 'hospital':
        url += '/hospitales/' + img;
      break;
      default:
        url += '/usuario/xxx';
        console.log('tipo de imagen inexistente');
      break;
    }

    return url;
  }

}
