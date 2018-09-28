import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/services.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  public usuario;

  constructor(public sidebar: SidebarService,
              public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

}
