import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  porcentajeAzul: number;
  porcentajeVerde: number;

  constructor() {
    this.porcentajeAzul = 5;
    this.porcentajeVerde = 45;
  }

  ngOnInit() {
  }

  actualizarAzul( event: number ) {
    this.porcentajeAzul = event;
  }

  actualizarVerde( event: number ) {
    this.porcentajeVerde = event;
  }


}
