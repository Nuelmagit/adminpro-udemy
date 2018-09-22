import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_app();

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string ;
  public recuerdame = false;
  public auth2: any;

  constructor(public router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
    init_app();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';

    if (localStorage.getItem('email')) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '76554374135-jsg7krpn5b1v805n05b9idosrp4fr02t.apps.googleusercontent.com',
          cookiepolicy: 'sigle_host_origin',
          scope: 'profile email',
        });

        this.attachSignIn( document.getElementById('btnGoogle') );
    });
  }

  attachSignIn(element ) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      const profile = googleUser.getBasicProfile();

      const token = googleUser.getAuthResponse().id_token;
      /*this.router.navigate(['/dashboard'])*/
      this.usuarioService.loginGoogle(token).subscribe( data => window.location.href = '#/dashboard');

    });
  }



  login(forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    const usuario = new Usuario(null, forma.value.email, forma.value.contraseña);

    this.usuarioService.login(usuario, this.recuerdame).subscribe( data => {
         this.router.navigate(['/dashboard']);
    });
  }

}
