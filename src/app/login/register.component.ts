import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UsuarioService } from '../services/services.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_app();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  sonIguales(camp1: string, camp2: string ) {

    return (group: FormGroup) => {

      const pass1 = group.controls[camp1].value;
      const pass2 = group.controls[camp2].value;

      if ( pass1 === pass2) {
        return null;
      }
      return  {
        sonIguales: true
      };
    };
  }

  ngOnInit() {
    init_app();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      passwordTwo: new FormControl(null, Validators.required),
      condiciones: new FormControl(false),
    }, {validators: this.sonIguales('password', 'passwordTwo') });

  }

  registrarUsuario() {
    console.log(this.forma.value);

    console.log(this.forma.valid);

    if (this.forma.invalid)  {
      return;
    }

    if (!this.forma.value.condiciones)  {
      swal('Importante!', 'debe aceptar las condiciones!', 'warning');
      return;
    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password,
    );

    this._usuarioService.crearUsuario(usuario)
          .subscribe( resp => {
            this.router.navigate(['/login']);
    });
  }

}
