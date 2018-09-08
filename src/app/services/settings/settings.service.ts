import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
   if ( localStorage.getItem('ajustes') ) {
    this.ajustes = JSON.parse( localStorage.getItem('ajustes'));
   }
   this.aplciarTerma(this.ajustes.tema);
  }

  aplciarTerma(color: string) {
    const url = `assets/css/colors/${ color }.css`;
    this._document.getElementById('main-theme').setAttribute('href', url);
    this.ajustes.tema = color;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
  }

  private check(link: any) {
    const selectores: any = document.getElementsByClassName('working');
    for (const ref of selectores) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }
}

interface Ajustes {
temaUrl: string;
tema: string;
}
