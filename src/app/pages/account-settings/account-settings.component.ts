import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { SettingsService } from '../../services/services.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document, public settings: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  changeColor(color: string, link: any) {
    this.settings.aplciarTerma(color);
    this.check(link);
  }

  private check(link: any) {
    const selectores: any = document.getElementsByClassName('working');
    for (const ref of selectores) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  private colocarCheck() {
    const selectores: any = document.getElementsByClassName('selector');

    const tema = this.settings.ajustes.tema;
    for (const ref of selectores) {
      if (ref.getAttribute('data-theme') === tema ) {
        ref.classList.add('working');
        return;
      }
    }
  }



}
