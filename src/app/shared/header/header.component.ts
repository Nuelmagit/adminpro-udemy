import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  public usuario;

  constructor(public _usuarioService: UsuarioService,
    public router: Router) { }

  ngOnInit() {

    this.usuario = this._usuarioService.usuario;
  }

  search(termino: string) {

    if (termino.length > 1) {
      this.router.navigate(['/busqueda', termino]);
    }

  }

}
