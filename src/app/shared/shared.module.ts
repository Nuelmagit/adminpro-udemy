import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../pages/modal-upload/modal-upload.component';


@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],
    declarations: [
        SidebarComponent,
        NopagefoundComponent,
        HeaderComponent,
        BreadcrumsComponent,
        ModalUploadComponent
    ],
    exports: [
        SidebarComponent,
        NopagefoundComponent,
        HeaderComponent,
        BreadcrumsComponent,
        ModalUploadComponent
    ],
})
export class SharedModule {}
