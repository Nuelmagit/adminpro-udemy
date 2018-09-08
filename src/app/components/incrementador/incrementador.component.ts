import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html'
})
export class IncrementadorComponent implements OnInit {

  @Input() porcentaje: number;
  @Input() leyenda: string;

  @ViewChild('txtPorcentaje') txtPorcentaje: ElementRef;

  // @Input('nombre') leyenda: string; se peude hacer un rename

  @Output() cambioValorEvent: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.porcentaje = 50;
    this.leyenda = 'Leyenda';
  }

  ngOnInit() {
    // aqui ya legaron los impurs
  }

  onChange( newValue: number) {

    // const html: any = document.getElementsByName('porcentaje')[0];

    if ( newValue >= 100 ) {
      this.porcentaje = 100;
    } else if (newValue <= 0) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = newValue;
    }

    // html.value = this.porcentaje;
    this.txtPorcentaje.nativeElement.value = this.porcentaje;
    this.cambioValorEvent.emit(this.porcentaje);
  }

  cambiarValor( valor: number ) {

    if ( this.porcentaje + valor >= 100 ) {
      this.porcentaje = 100;
    } else if (this.porcentaje + valor <= 0) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = this.porcentaje + valor;
    }
    this.cambioValorEvent.emit(this.porcentaje);

    this.txtPorcentaje.nativeElement.focus();
  }

}
