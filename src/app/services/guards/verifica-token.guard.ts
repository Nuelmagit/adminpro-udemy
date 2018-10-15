import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService,
    public router: Router) { }

  canActivate(): Promise<boolean> | boolean {

    const token = this._usuarioService.token;
    const payload = JSON.parse( atob( token.split('.')[1] ));
    const expirado = this.expirado(payload.exp);

    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }



    return this.verificaRenueva( payload.exp );
  }

  verificaRenueva(fechaExpira: number ): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      const tokenExp = new Date(fechaExpira * 1000);
      const now = new Date();
            // si a al persona le quedan 4 horas de tiempo de token se lo renuevo!.
      now.setTime( now.getTime() + ( 4 * 60 * 60 * 1000) );

      console.log(tokenExp);
      console.log(now);

      if (tokenExp.getTime() > now.getTime() ) {
        resolve(true);
      } else {
        this._usuarioService.renuevaToken().subscribe( (resp: boolean) => {
          resolve(true);
        }, (err: any) => {
          this.router.navigate(['/login']);
          reject(false);
        });
      }



    } );
  }

  expirado( fechaExpira: number) {
    const now = new Date().getTime() / 1000;

    if ( fechaExpira < now) {
      return true;
    }
    return false;
  }

}
